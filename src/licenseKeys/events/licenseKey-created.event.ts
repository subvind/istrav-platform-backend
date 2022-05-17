import { SUBSCRIPTION_STATUS } from '../enums/status.enum'

export class LicenseKeyCreatedEvent {
  id: string;
  status: SUBSCRIPTION_STATUS;
  token: string;
  description: string;
  websiteId: string;
  tenantId: string;
}