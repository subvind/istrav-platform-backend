import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  // register
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.accountId = createUserDto.accountId;

    return this.usersRepository.save(user)
  }

  update(updateUserDto: UpdateUserDto): Promise<User> {
    const user = new User();
    user.id = updateUserDto.id;
    user.accountId = updateUserDto.accountId;

    return this.usersRepository.update({ id: user.id }, user).then(r => {
      return r.raw
    })
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<User> {
  //   return this.usersRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}