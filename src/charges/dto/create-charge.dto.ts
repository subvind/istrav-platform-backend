import { PAYMENT_INTENT_STATUS } from '../enums/status.enum'

export class CreateChargeDto {
  status: PAYMENT_INTENT_STATUS;
  description: string;
  amount: number;
  billId: string;
  tenantReferenceId: string;
}