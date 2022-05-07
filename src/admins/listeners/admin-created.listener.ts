import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AdminCreatedEvent } from '../events/admin-created.event';
import { AdminCreatedGateway } from '../gateways/admin-created.gateway'

@Injectable()
export class AdminCreatedListener {
  @OnEvent('admin.created')
  handleUserCreatedEvent(event: AdminCreatedEvent) {
    // handle and process event
    console.log('listen: admin.created', event);
    
  }
}