import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MemberCreatedEvent } from '../events/member-created.event';
import { MemberCreatedGateway } from '../gateways/member-created.gateway'

@Injectable()
export class MemberCreatedListener {
  @OnEvent('member.created')
  handleUserCreatedEvent(event: MemberCreatedEvent) {
    // handle and process event
    console.log('listen: member.created', event);
    
  }
}