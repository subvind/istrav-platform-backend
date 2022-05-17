import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ChargeCreatedEvent } from '../events/charge-created.event';
import { ChargeCreatedGateway } from '../gateways/charge-created.gateway'

@Injectable()
export class ChargeCreatedListener {
  @OnEvent('charge.created')
  handleUserCreatedEvent(event: ChargeCreatedEvent) {
    // handle and process event
    console.log('listen: charge.created', event);
    
  }
}