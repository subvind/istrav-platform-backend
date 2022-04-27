import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('whois/:id')
  getHowis(@Param('id') id: string): Promise<string> {
    return this.appService.getHowis(id);
  }
}
