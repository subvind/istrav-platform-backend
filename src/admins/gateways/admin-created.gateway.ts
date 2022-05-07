import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { AdminsService } from '../admins.service'
import { Admin } from '../entities/admin.entity';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { AdminCreatedEvent } from '../events/admin-created.event';

@WebSocketGateway(8080)
export class AdminCreatedGateway {
  constructor(public readonly adminsService: AdminsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('admin.create')
  onEvent(client: any, data: CreateAdminDto) {
    return this.adminsService.create(data)
      .then((admin: Admin) => {
        const adminCreatedEvent = new AdminCreatedEvent();
        adminCreatedEvent.id = admin.id;
        adminCreatedEvent.accountId = admin.accountId;
        
        console.log('gateway: admin.created', adminCreatedEvent);
        this.adminsService.eventEmitter.emit('admin.created', adminCreatedEvent)
        return { event: 'admin.create', payload: data };
      })
  }
}