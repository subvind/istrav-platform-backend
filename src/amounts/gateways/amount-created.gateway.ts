import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { AmountsService } from '../amounts.service'
import { Amount } from '../entities/amount.entity';
import { CreateAmountDto } from '../dto/create-amount.dto';
import { AmountCreatedEvent } from '../events/amount-created.event';

@WebSocketGateway(8080)
export class AmountCreatedGateway {
  constructor(public readonly amountsService: AmountsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('amount.create')
  onEvent(client: any, data: CreateAmountDto) {
    return this.amountsService.create(data)
      .then((amount: Amount) => {
        const amountCreatedEvent = new AmountCreatedEvent();
        amountCreatedEvent.id = amount.id;
        amountCreatedEvent.value = amount.value;
        amountCreatedEvent.licenseKeyId = amount.licenseKeyId;
        amountCreatedEvent.billId = amount.billId;
        amountCreatedEvent.tenantId = amount.tenantId;
        
        console.log('gateway: amount.created', amountCreatedEvent);
        this.amountsService.eventEmitter.emit('amount.created', amountCreatedEvent)
        return { event: 'amount.create', payload: data };
      })
  }
}