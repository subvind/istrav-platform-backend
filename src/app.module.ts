import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from './accounts/accounts.module';
import { TenantsModule } from './tenants/tenants.module';
import { WebsitesModule } from './websites/websites.module';
import { SocialGroupsModule } from './socialGroups/socialGroups.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

let url: string
let ssl: any
if (process.env.DATABASE_URL) {
  url = process.env.DATABASE_URL
  ssl = {
    rejectUnauthorized: false
  }
} else {
  url = 'postgres://istrav:furlong@127.0.0.1:5432/community_folder'
  ssl = false
}

@Module({
  imports: [  
    TypeOrmModule.forRoot({
      url,
      ssl,
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AccountsModule,
    TenantsModule,
    WebsitesModule,
    SocialGroupsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
