import { PartialType } from '@nestjs/mapped-types';
import { CreateWebsiteDto } from './create-website.dto';

export class UpdateWebsiteDto extends PartialType(CreateWebsiteDto) {
  id: string
  isRoot: boolean
}