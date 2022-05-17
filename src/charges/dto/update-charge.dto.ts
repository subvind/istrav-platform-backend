import { PartialType } from '@nestjs/mapped-types';
import { CreateChargeDto } from './create-charge.dto';

export class UpdateChargeDto extends PartialType(CreateChargeDto) {
  id: string
}