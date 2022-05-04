import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TenantCreatedEvent } from '../events/tenant-created.event';
import { TenantCreatedGateway } from '../gateways/tenant-created.gateway'

@Injectable()
export class TenantCreatedListener {
  @OnEvent('tenant.created')
  handleUserCreatedEvent(event: TenantCreatedEvent) {
    // handle and process event
    console.log('listen: tenant.created', event);
    
  }
}