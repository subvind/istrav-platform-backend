import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MasterCreatedEvent } from '../events/master-created.event';
import { MasterCreatedGateway } from '../gateways/master-created.gateway'

@Injectable()
export class MasterCreatedListener {
  @OnEvent('master.created')
  handleUserCreatedEvent(event: MasterCreatedEvent) {
    // handle and process event
    console.log('listen: master.created', event);
    
  }
}