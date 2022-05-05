import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { MembersService } from '../members.service'
import { Member } from '../entities/member.entity';
import { CreateMemberDto } from '../dto/create-member.dto';
import { MemberCreatedEvent } from '../events/member-created.event';

@WebSocketGateway(8080)
export class MemberCreatedGateway {
  constructor(public readonly membersService: MembersService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('member.create')
  onEvent(client: any, data: CreateMemberDto) {
    return this.membersService.create(data)
      .then((member: Member) => {
        const memberCreatedEvent = new MemberCreatedEvent();
        memberCreatedEvent.id = member.id;
        memberCreatedEvent.topLevelDomainName = member.topLevelDomainName;
        
        console.log('gateway: member.created', memberCreatedEvent);
        this.membersService.eventEmitter.emit('member.created', memberCreatedEvent)
        return { event: 'member.create', payload: data };
      })
  }
}