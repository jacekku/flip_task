import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { StatsService } from './stats.service';
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
  providers: [StatsService],
})
export class AppModule {}
