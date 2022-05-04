import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { WebsitesService } from '../websites.service'
import { Website } from '../entities/website.entity';
import { CreateWebsiteDto } from '../dto/create-website.dto';
import { WebsiteCreatedEvent } from '../events/website-created.event';

@WebSocketGateway(8080)
export class WebsiteCreatedGateway {
  constructor(public readonly websitesService: WebsitesService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('website.create')
  onEvent(client: any, data: CreateWebsiteDto) {
    return this.websitesService.create(data)
      .then((website: Website) => {
        const websiteCreatedEvent = new WebsiteCreatedEvent();
        websiteCreatedEvent.id = website.id;
        websiteCreatedEvent.username = website.username;
        
        console.log('gateway: website.created', websiteCreatedEvent);
        this.websitesService.eventEmitter.emit('website.created', websiteCreatedEvent)
        return { event: 'website.create', payload: data };
      })
  }
}