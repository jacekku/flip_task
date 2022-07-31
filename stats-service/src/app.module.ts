import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { AppController } from './app.controller';
import { EventStoreModule } from './event-store/event-store.module';
import { StatsService } from './stats.service';
import { TotalBoughtModule } from './total-store/total-bought.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${env.MONGO_HOST}${
        env.MONGO_PORT ? `:${env.MONGO_PORT}` : ''
      }/${env.MONGO_DB_NAME}`,
    ),
    EventEmitterModule.forRoot(),
    EventStoreModule,
    TotalBoughtModule,
  ],
  controllers: [AppController],
  providers: [StatsService],
})
export class AppModule {}
