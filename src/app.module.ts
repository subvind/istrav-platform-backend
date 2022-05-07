import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from './accounts/accounts.module';
import { AdminsModule } from './admins/admins.module';
import { ClientsModule } from './clients/clients.module';
import { MastersModule } from './masters/masters.module';
import { MembersModule } from './members/members.module';
import { SocialGroupsModule } from './socialGroups/socialGroups.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { WebsitesModule } from './websites/websites.module';

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
      schema: 'public'
    }),
    AccountsModule,
    AdminsModule,
    ClientsModule,
    MastersModule,
    MembersModule,
    SocialGroupsModule,
    TenantsModule,
    UsersModule,
    WebsitesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
