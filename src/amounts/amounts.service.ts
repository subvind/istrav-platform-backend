import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateAmountDto } from './dto/create-amount.dto';
import { UpdateAmountDto } from './dto/update-amount.dto';

import { Amount } from './entities/amount.entity';
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
export class AmountsService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Amount)
    private readonly amountsRepository: Repository<Amount>,
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) {}

  // register
  async create(createAmountDto: CreateAmountDto): Promise<Amount> {
    let config = await findIdByName(
      this,
      createAmountDto.tenantReferenceId,
    )

    const amount = new Amount();
    amount.domainName = createAmountDto.domainName;
    amount.displayName = createAmountDto.displayName;
    amount.ownerId = createAmountDto.ownerId;
    amount.tenantId = config.tenant.id;

    return this.amountsRepository.save(amount)
  }

  async update(updateAmountDto: UpdateAmountDto): Promise<Amount> {
    // let config = await findIdByName(
    //   this,
    //   updateAmountDto.tenantReferenceId,
    // )

    const amount = new Amount();
    amount.id = updateAmountDto.id;
    amount.domainName = updateAmountDto.domainName;
    amount.displayName = updateAmountDto.displayName;
    amount.ownerId = updateAmountDto.ownerId;

    await this.amountsRepository.update(amount.id, amount)
    return this.amountsRepository.findOneBy({ id: amount.id });
  }

  async findAll(): Promise<Amount[]> {
    return this.amountsRepository.find();
  }

  findOne(id: string): Promise<Amount> {
    return this.amountsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.amountsRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Amount> {
  //   return this.amountsRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}