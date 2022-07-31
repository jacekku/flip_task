import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventStoreModule } from './event-store/event-store.module';

@Module({
  imports: [
    EventStoreModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${env.MONGO_HOST}${
        env.MONGO_PORT ? `:${env.MONGO_PORT}` : ''
      }/${env.MONGO_DB_NAME}`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
