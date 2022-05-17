import { PartialType } from '@nestjs/mapped-types';
import { CreateAmountDto } from './create-amount.dto';

export class UpdateAmountDto extends PartialType(CreateAmountDto) {
  id: string
}