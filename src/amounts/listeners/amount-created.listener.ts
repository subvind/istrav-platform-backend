import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AmountCreatedEvent } from '../events/amount-created.event';
import { AmountCreatedGateway } from '../gateways/amount-created.gateway'

@Injectable()
export class AmountCreatedListener {
  @OnEvent('amount.created')
  handleUserCreatedEvent(event: AmountCreatedEvent) {
    // handle and process event
    console.log('listen: amount.created', event);
    
  }
}