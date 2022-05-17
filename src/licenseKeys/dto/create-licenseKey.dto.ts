import { SUBSCRIPTION_STATUS } from '../enums/status.enum'

export class CreateLicenseKeyDto {
  status: SUBSCRIPTION_STATUS;
  token: string;
  description: string;
  domainName: string;
  tenantReferenceId: string;
}