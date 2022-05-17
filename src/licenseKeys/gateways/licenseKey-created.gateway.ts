import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { LicenseKeysService } from '../licenseKeys.service'
import { LicenseKey } from '../entities/licenseKey.entity';
import { CreateLicenseKeyDto } from '../dto/create-licenseKey.dto';
import { LicenseKeyCreatedEvent } from '../events/licenseKey-created.event';

@WebSocketGateway(8080)
export class LicenseKeyCreatedGateway {
  constructor(public readonly licenseKeysService: LicenseKeysService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('licenseKey.create')
  onEvent(client: any, data: CreateLicenseKeyDto) {
    return this.licenseKeysService.create(data)
      .then((licenseKey: LicenseKey) => {
        const licenseKeyCreatedEvent = new LicenseKeyCreatedEvent();
        licenseKeyCreatedEvent.id = licenseKey.id;
        licenseKeyCreatedEvent.status = licenseKey.status;
        licenseKeyCreatedEvent.token = licenseKey.token;
        licenseKeyCreatedEvent.description = licenseKey.description;
        licenseKeyCreatedEvent.websiteId = licenseKey.websiteId;
        licenseKeyCreatedEvent.tenantId = licenseKey.tenantId;
        
        console.log('gateway: licenseKey.created', licenseKeyCreatedEvent);
        this.licenseKeysService.eventEmitter.emit('licenseKey.created', licenseKeyCreatedEvent)
        return { event: 'licenseKey.create', payload: data };
      })
  }
}