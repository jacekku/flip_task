import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleEvent, SaleEventSchema } from 'src/schema/sale-event.schema';
import { EventStoreConsumer } from './consumer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SaleEvent.name, schema: SaleEventSchema },
    ]),
  ],
  providers: [EventStoreConsumer],
  exports: [EventStoreConsumer],
})
export class EventStoreModule {}
