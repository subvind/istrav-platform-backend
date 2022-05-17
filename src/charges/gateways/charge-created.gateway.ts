import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { ChargesService } from '../charges.service'
import { Charge } from '../entities/charge.entity';
import { CreateChargeDto } from '../dto/create-charge.dto';
import { ChargeCreatedEvent } from '../events/charge-created.event';

@WebSocketGateway(8080)
export class ChargeCreatedGateway {
  constructor(public readonly chargesService: ChargesService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('charge.create')
  onEvent(client: any, data: CreateChargeDto) {
    return this.chargesService.create(data)
      .then((charge: Charge) => {
        const chargeCreatedEvent = new ChargeCreatedEvent();
        chargeCreatedEvent.id = charge.id;
        chargeCreatedEvent.status = charge.status;
        chargeCreatedEvent.description = charge.description;
        chargeCreatedEvent.amount = charge.amount;
        chargeCreatedEvent.billId = charge.billId;
        chargeCreatedEvent.tenantId = charge.tenantId;
        
        console.log('gateway: charge.created', chargeCreatedEvent);
        this.chargesService.eventEmitter.emit('charge.created', chargeCreatedEvent)
        return { event: 'charge.create', payload: data };
      })
  }
}