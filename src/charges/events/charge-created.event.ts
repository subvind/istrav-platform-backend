import { PAYMENT_INTENT_STATUS } from '../enums/status.enum'

export class ChargeCreatedEvent {
  id: string;
  status: PAYMENT_INTENT_STATUS;
  description: string;
  amount: number;
  billId: string;
  tenantReferenceId: string;
  tenantId: string;
}