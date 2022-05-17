import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateLicenseKeyDto } from './dto/create-licenseKey.dto';
import { UpdateLicenseKeyDto } from './dto/update-licenseKey.dto';
import { VerifyLicenseKeyDto } from './dto/verify-licenseKey.dto';

import { LicenseKey } from './entities/licenseKey.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { Website } from '../websites/entities/website.entity';

import * as jwt from "jsonwebtoken";

async function getLicenseKey (that, token) {
  return await that.licenseKeysRepository.findOne({
    select: ["id"],
    where: {
      token: token
    },
    relations: {
      website: {
        domainName: true
      }
    }
  })
}

async function findIdByName (that, tenantReferenceId, domainName) {
  // find tenant by given tenantReferenceId
  const tenant = await that.tenantsRepository.findOne({
    select: ["id"],
    where: {
      referenceId: tenantReferenceId
    }
  })

  // find website by given domainName
  const website = await that.websitesRepository.findOne({
    select: ["id"],
    where: {
      domainName: domainName
    }
  })

  return { 
    tenant,
    website
  }
}

@Injectable()
export class LicenseKeysService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(LicenseKey)
    private readonly licenseKeysRepository: Repository<LicenseKey>,
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    @InjectRepository(Website)
    private readonly websitesRepository: Repository<Website>,
  ) {}

  // register
  async create(createLicenseKeyDto: CreateLicenseKeyDto): Promise<LicenseKey> {
    let config = await findIdByName(
      this,
      createLicenseKeyDto.tenantReferenceId,
      createLicenseKeyDto.domainName
    )

    const licenseKey = new LicenseKey();
    let website = await this.websitesRepository.findOne({
      select: ["id", "domainName"],
      where: {
        domainName: createLicenseKeyDto.domainName
      }
    })
    licenseKey.token =  jwt.sign({
      website
    }, process.env.SECRET || 'development-secret')

    licenseKey.websiteId = config.website.id;
    licenseKey.tenantId = config.tenant.id;

    return this.licenseKeysRepository.save(licenseKey)
  }

  async update(updateLicenseKeyDto: UpdateLicenseKeyDto): Promise<LicenseKey> {
    let config = await findIdByName(
      this,
      updateLicenseKeyDto.tenantReferenceId,
      updateLicenseKeyDto.domainName
    )

    const licenseKey = new LicenseKey();
    licenseKey.id = updateLicenseKeyDto.id;
    let website = await this.websitesRepository.findOne({
      select: ["id", "domainName"],
      where: {
        domainName: updateLicenseKeyDto.domainName
      }
    })
    licenseKey.token =  jwt.sign({
      website
    }, process.env.SECRET || 'development-secret')
    licenseKey.websiteId = config.website.id;
    licenseKey.tenantId = config.tenant.id;

    await this.licenseKeysRepository.update(licenseKey.id, licenseKey)
    return this.licenseKeysRepository.findOneBy({ id: licenseKey.id });
  }

  async findAll(): Promise<LicenseKey[]> {
    return this.licenseKeysRepository.find({
      relations: {
        website: true
      }
    });
  }

  findOne(id: string): Promise<LicenseKey> {
    return this.licenseKeysRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.licenseKeysRepository.delete(id);
  }

  async verify(verifyLicenseKeyDto: VerifyLicenseKeyDto): Promise<LicenseKey | object> {
    let token = verifyLicenseKeyDto.token
    let decoded = jwt.verify(token, process.env.SECRET || 'development-secret')

    if (decoded) {
      let licenseKey = getLicenseKey(this, token)
      return { valid: true, token, licenseKey }
    } else {
      return { valid: false, token }
    }
  }

  // findOneWithHosts(id: string): Promise<LicenseKey> {
  //   return this.licenseKeysRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}