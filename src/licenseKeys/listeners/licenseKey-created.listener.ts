import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LicenseKeyCreatedEvent } from '../events/licenseKey-created.event';
import { LicenseKeyCreatedGateway } from '../gateways/licenseKey-created.gateway'

@Injectable()
export class LicenseKeyCreatedListener {
  @OnEvent('licenseKey.created')
  handleUserCreatedEvent(event: LicenseKeyCreatedEvent) {
    // handle and process event
    console.log('listen: licenseKey.created', event);
    
  }
}