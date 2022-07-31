import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SaleEvent, SaleEventSchema } from "src/schema/sale-event.schema";
import { EventStoreProducer } from "./producer.service";

@Module({
  imports: [MongooseModule.forFeature([{name: SaleEvent.name, schema: SaleEventSchema}])],
    providers: [EventStoreProducer],
    exports: [EventStoreProducer]
  })
export class EventStoreModule {}