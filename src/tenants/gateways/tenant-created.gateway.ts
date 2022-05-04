import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { TenantsService } from '../tenants.service'
import { Tenant } from '../entities/tenant.entity';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { TenantCreatedEvent } from '../events/tenant-created.event';

@WebSocketGateway(8080)
export class TenantCreatedGateway {
  constructor(public readonly tenantsService: TenantsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('tenant.create')
  onEvent(client: any, data: CreateTenantDto) {
    return this.tenantsService.create(data)
      .then((tenant: Tenant) => {
        const tenantCreatedEvent = new TenantCreatedEvent();
        tenantCreatedEvent.id = tenant.id;
        tenantCreatedEvent.username = tenant.username;
        
        console.log('gateway: tenant.created', tenantCreatedEvent);
        this.tenantsService.eventEmitter.emit('tenant.created', tenantCreatedEvent)
        return { event: 'tenant.create', payload: data };
      })
  }
}