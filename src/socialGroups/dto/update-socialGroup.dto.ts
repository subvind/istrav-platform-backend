import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialGroupDto } from './create-socialGroup.dto';

export class UpdateSocialGroupDto extends PartialType(CreateSocialGroupDto) {
  id: string
}