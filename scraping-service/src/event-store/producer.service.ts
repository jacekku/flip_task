import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { SaleEvent, SaleEventDocument } from 'src/schema/sale-event.schema';

@Injectable()
export class EventStoreProducer {
  constructor(
    @InjectModel(SaleEvent.name) private saleModel: Model<SaleEventDocument>,
  ) {}
  produce(sale: SaleEvent) {
    const newEvent = new this.saleModel(sale);

    newEvent.updateOne();
  }
}
