import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WebsiteCreatedEvent } from '../events/website-created.event';
import { WebsiteCreatedGateway } from '../gateways/website-created.gateway'

@Injectable()
export class WebsiteCreatedListener {
  @OnEvent('website.created')
  handleUserCreatedEvent(event: WebsiteCreatedEvent) {
    // handle and process event
    console.log('listen: website.created', event);
    
  }
}