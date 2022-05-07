import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { UsersService } from '../users.service'
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserCreatedEvent } from '../events/user-created.event';

@WebSocketGateway(8080)
export class UserCreatedGateway {
  constructor(public readonly usersService: UsersService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('user.create')
  onEvent(client: any, data: CreateUserDto) {
    return this.usersService.create(data)
      .then((user: User) => {
        const userCreatedEvent = new UserCreatedEvent();
        userCreatedEvent.id = user.id;
        userCreatedEvent.username = user.username;
        userCreatedEvent.accountId = user.accountId;
        userCreatedEvent.websiteId = user.websiteId;
        userCreatedEvent.tenantId = user.tenantId;
        
        console.log('gateway: user.created', userCreatedEvent);
        this.usersService.eventEmitter.emit('user.created', userCreatedEvent)
        return { event: 'user.create', payload: data };
      })
  }
}