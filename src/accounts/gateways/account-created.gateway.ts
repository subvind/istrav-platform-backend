import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { AccountsService } from '../accounts.service'
import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountCreatedEvent } from '../events/account-created.event';

@WebSocketGateway(8080)
export class AccountCreatedGateway {
  constructor(public readonly accountsService: AccountsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('account.create')
  onEvent(client: any, data: CreateAccountDto) {
    return this.accountsService.create(data)
      .then((account: Account) => {
        const accountCreatedEvent = new AccountCreatedEvent();
        accountCreatedEvent.id = account.id;
        accountCreatedEvent.username = account.username;
        
        console.log('gateway: account.created', accountCreatedEvent);
        this.accountsService.eventEmitter.emit('account.created', accountCreatedEvent)
        return { event: 'account.create', payload: data };
      })
  }
}