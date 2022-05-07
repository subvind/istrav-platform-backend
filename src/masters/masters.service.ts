import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { Master } from './entities/master.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MastersService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Master)
    private readonly mastersRepository: Repository<Master>
  ) {}

  // register
  create(createMasterDto: CreateMasterDto): Promise<Master> {
    const master = new Master();
    master.username = createMasterDto.username;
    master.accountId = createMasterDto.accountId;

    return this.mastersRepository.save(master)
  }

  update(updateMasterDto: UpdateMasterDto): Promise<Master> {
    const master = new Master();
    master.id = updateMasterDto.id;
    master.username = updateMasterDto.username;
    master.accountId = updateMasterDto.accountId;

    return this.mastersRepository.update({ id: master.id }, master).then(r => {
      return r.raw
    })
  }

  async findAll(): Promise<Master[]> {
    return this.mastersRepository.find();
  }

  findOne(id: string): Promise<Master> {
    return this.mastersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.mastersRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Master> {
  //   return this.mastersRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}