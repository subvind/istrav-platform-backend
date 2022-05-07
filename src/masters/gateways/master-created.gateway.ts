import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { MastersService } from '../masters.service'
import { Master } from '../entities/master.entity';
import { CreateMasterDto } from '../dto/create-master.dto';
import { MasterCreatedEvent } from '../events/master-created.event';

@WebSocketGateway(8080)
export class MasterCreatedGateway {
  constructor(public readonly mastersService: MastersService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('master.create')
  onEvent(client: any, data: CreateMasterDto) {
    return this.mastersService.create(data)
      .then((master: Master) => {
        const masterCreatedEvent = new MasterCreatedEvent();
        masterCreatedEvent.id = master.id;
        masterCreatedEvent.accountId = master.accountId;
        
        console.log('gateway: master.created', masterCreatedEvent);
        this.mastersService.eventEmitter.emit('master.created', masterCreatedEvent)
        return { event: 'master.create', payload: data };
      })
  }
}