import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ClientsService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>
  ) {}

  // register
  create(createClientDto: CreateClientDto): Promise<Client> {
    const client = new Client();
    client.username = createClientDto.username;
    client.accountId = createClientDto.accountId;
    client.tenantId = createClientDto.tenantId

    return this.clientsRepository.save(client)
  }

  update(updateClientDto: UpdateClientDto): Promise<Client> {
    const client = new Client();
    client.id = updateClientDto.id;
    client.username = updateClientDto.username;
    client.accountId = updateClientDto.accountId;
    client.tenantId = updateClientDto.tenantId;

    return this.clientsRepository.update({ id: client.id }, client).then(r => {
      return r.raw
    })
  }

  async findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  findOne(id: string): Promise<Client> {
    return this.clientsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.clientsRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Client> {
  //   return this.clientsRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}