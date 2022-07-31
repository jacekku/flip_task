import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventStoreModule } from './event-store/event-store.module';

@Module({
  imports: [EventStoreModule, MongooseModule.forRoot('mongodb://localhost/fliptask')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
