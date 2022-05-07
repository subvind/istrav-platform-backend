import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { ClientsService } from '../clients.service'
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientCreatedEvent } from '../events/client-created.event';

@WebSocketGateway(8080)
export class ClientCreatedGateway {
  constructor(public readonly clientsService: ClientsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('client.create')
  onEvent(client: any, data: CreateClientDto) {
    return this.clientsService.create(data)
      .then((client: Client) => {
        const clientCreatedEvent = new ClientCreatedEvent();
        clientCreatedEvent.id = client.id;
        clientCreatedEvent.username = client.username;
        clientCreatedEvent.accountId = client.accountId;
        clientCreatedEvent.tenantId = client.tenantId;
        
        console.log('gateway: client.created', clientCreatedEvent);
        this.clientsService.eventEmitter.emit('client.created', clientCreatedEvent)
        return { event: 'client.create', payload: data };
      })
  }
}