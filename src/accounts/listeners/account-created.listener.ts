import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AccountCreatedEvent } from '../events/account-created.event';
import { AccountCreatedGateway } from '../gateways/account-created.gateway'

@Injectable()
export class AccountCreatedListener {
  @OnEvent('account.created')
  handleUserCreatedEvent(event: AccountCreatedEvent) {
    // handle and process event
    console.log('listen: account.created', event);
    
  }
}