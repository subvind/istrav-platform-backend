import { PartialType } from '@nestjs/mapped-types';
import { CreateLicenseKeyDto } from './create-licenseKey.dto';

export class UpdateLicenseKeyDto extends PartialType(CreateLicenseKeyDto) {
  id: string
}