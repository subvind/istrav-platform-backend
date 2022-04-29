import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from './accounts/accounts.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

let pgType: any = process.env.POSTGRES_TYPE || 'postgres'
let pgHost = process.env.POSTGRES_HOST || '127.0.0.1'
let pgPort = parseInt(process.env.POSTGRES_PORT) || 5432
let pgDatabase = process.env.POSTGRES_DATABASE || 'community_folder'
let pgUsername = process.env.POSTGRES_USERNAME || 'istrav'
let pgPassword = process.env.POSTGRES_PASSWORD || 'furlong'

@Module({
  imports: [  
    TypeOrmModule.forRoot({
      type: pgType,
      host: pgHost,
      port: pgPort,
      database: pgDatabase,
      username: pgUsername,
      password: pgPassword,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AccountsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
