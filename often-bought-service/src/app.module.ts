import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventStoreModule } from './event-store/event-store.module';
import { TotalBoughtModule } from './total-store/total-bought.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/fliptask'),
    EventEmitterModule.forRoot(),
    EventStoreModule,
    TotalBoughtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
