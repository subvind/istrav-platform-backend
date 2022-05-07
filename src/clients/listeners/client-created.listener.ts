import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientCreatedEvent } from '../events/client-created.event';
import { ClientCreatedGateway } from '../gateways/client-created.gateway'

@Injectable()
export class ClientCreatedListener {
  @OnEvent('client.created')
  handleUserCreatedEvent(event: ClientCreatedEvent) {
    // handle and process event
    console.log('listen: client.created', event);
    
  }
}