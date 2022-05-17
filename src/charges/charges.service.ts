import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';

import { Charge } from './entities/charge.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

async function findIdByName (that, tenantReferenceId) {
  // find tenant by given tenantReferenceId
  const tenant = await that.tenantsRepository.findOne({
    select: ["id"],
    where: {
      referenceId: tenantReferenceId
    }
  })

  return { 
    tenant
  }
}

@Injectable()
export class ChargesService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Charge)
    private readonly chargesRepository: Repository<Charge>,
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) {}

  // register
  async create(createChargeDto: CreateChargeDto): Promise<Charge> {
    let config = await findIdByName(
      this,
      createChargeDto.tenantReferenceId,
    )

    const charge = new Charge();
    charge.domainName = createChargeDto.domainName;
    charge.displayName = createChargeDto.displayName;
    charge.ownerId = createChargeDto.ownerId;
    charge.tenantId = config.tenant.id;

    return this.chargesRepository.save(charge)
  }

  async update(updateChargeDto: UpdateChargeDto): Promise<Charge> {
    // let config = await findIdByName(
    //   this,
    //   updateChargeDto.tenantReferenceId,
    // )

    const charge = new Charge();
    charge.id = updateChargeDto.id;
    charge.domainName = updateChargeDto.domainName;
    charge.displayName = updateChargeDto.displayName;
    charge.ownerId = updateChargeDto.ownerId;

    await this.chargesRepository.update(charge.id, charge)
    return this.chargesRepository.findOneBy({ id: charge.id });
  }

  async findAll(): Promise<Charge[]> {
    return this.chargesRepository.find();
  }

  findOne(id: string): Promise<Charge> {
    return this.chargesRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.chargesRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Charge> {
  //   return this.chargesRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}