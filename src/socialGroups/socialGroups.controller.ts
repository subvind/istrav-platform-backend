import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialGroupsService } from './socialGroups.service';
import { CreateSocialGroupDto } from './dto/create-socialGroup.dto';
import { UpdateSocialGroupDto } from './dto/update-socialGroup.dto';

@Controller('socialGroups')
export class SocialGroupsController {
  constructor(private readonly socialGroupsService: SocialGroupsService) {}

  @Post()
  create(@Body() createSocialGroupDto: CreateSocialGroupDto) {
    return this.socialGroupsService.create(createSocialGroupDto);
  }

  @Get()
  findAll() {
    return this.socialGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialGroupsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialGroupDto: UpdateSocialGroupDto) {
    updateSocialGroupDto.id = id
    return this.socialGroupsService.update(updateSocialGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialGroupsService.remove(id);
  }
}
