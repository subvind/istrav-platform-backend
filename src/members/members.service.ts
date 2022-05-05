import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MembersService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>
  ) {}

  // register
  create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = new Member();
    member.topLevelDomainName = createMemberDto.topLevelDomainName;
    member.displayName = createMemberDto.displayName;

    return this.membersRepository.save(member)
  }

  update(updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = new Member();
    member.id = updateMemberDto.id;
    member.topLevelDomainName = updateMemberDto.topLevelDomainName;
    member.displayName = updateMemberDto.displayName;

    return this.membersRepository.update({ id: member.id }, member).then(r => {
      return r.raw
    })
  }

  async findAll(): Promise<Member[]> {
    return this.membersRepository.find();
  }

  findOne(id: string): Promise<Member> {
    return this.membersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.membersRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Member> {
  //   return this.membersRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}