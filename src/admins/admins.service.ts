import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AdminsService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>
  ) {}

  // register
  create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = new Admin();
    admin.accountId = createAdminDto.accountId;

    return this.adminsRepository.save(admin)
  }

  update(updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = new Admin();
    admin.id = updateAdminDto.id;
    admin.accountId = updateAdminDto.accountId;

    return this.adminsRepository.update({ id: admin.id }, admin).then(r => {
      return r.raw
    })
  }

  async findAll(): Promise<Admin[]> {
    return this.adminsRepository.find();
  }

  findOne(id: string): Promise<Admin> {
    return this.adminsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.adminsRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Admin> {
  //   return this.adminsRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}