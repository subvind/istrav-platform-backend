import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SocialGroupCreatedEvent } from '../events/socialGroup-created.event';
import { SocialGroupCreatedGateway } from '../gateways/socialGroup-created.gateway'

@Injectable()
export class SocialGroupCreatedListener {
  @OnEvent('socialGroup.created')
  handleUserCreatedEvent(event: SocialGroupCreatedEvent) {
    // handle and process event
    console.log('listen: socialGroup.created', event);
    
  }
}