import { INVOICE_STATUS } from '../enums/status.enum'

export class BillCreatedEvent {
  id: string;
  status: INVOICE_STATUS;
  description: string;
  paid: boolean;
  total: Number;
  chargeId: string;
  licenseKeyId: string;
  tenantId: string;
}