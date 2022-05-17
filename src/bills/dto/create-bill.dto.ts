import { INVOICE_STATUS } from '../enums/status.enum'

export class CreateBillDto {
  status: INVOICE_STATUS;
  description: string;
  paid: boolean;
  total: number;
  chargeId: string;
  licenseKeyId: string;
  tenantReferenceId: string;
}