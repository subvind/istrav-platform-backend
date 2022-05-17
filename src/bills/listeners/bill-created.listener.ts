import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BillCreatedEvent } from '../events/bill-created.event';
import { BillCreatedGateway } from '../gateways/bill-created.gateway'

@Injectable()
export class BillCreatedListener {
  @OnEvent('bill.created')
  handleUserCreatedEvent(event: BillCreatedEvent) {
    // handle and process event
    console.log('listen: bill.created', event);
    
  }
}