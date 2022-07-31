import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { ChangeStreamDocument } from 'mongodb';
import { Cursor, Model, MongooseError } from 'mongoose';
import { SaleEvent, SaleEventDocument } from 'src/schema/sale-event.schema';

@Injectable()
export class EventStoreConsumer implements OnApplicationBootstrap {
  collectionSize = 0;
  constructor(
    @InjectModel(SaleEvent.name) private saleModel: Model<SaleEventDocument>,
    private eventEmitter: EventEmitter2,
  ) {}
  async onApplicationBootstrap() {
    setTimeout(this.readStoredEvents.bind(this), 1);
    this.collectionSize = await this.saleModel.collection.countDocuments({});
    setInterval(this.collectionWatch.bind(this), 5000);
  }
  // cannot listen to mongodb changes so let's poll every second
  async collectionWatch() {
    const size = await this.saleModel.collection.countDocuments({});
    if (this.collectionSize < size) {
      console.log('New Event: ' + size);

      const addedDocs = await this.saleModel.collection
        .find({})
        .sort({ _id: -1 })
        .limit(size - this.collectionSize);
      for (
        let doc = await addedDocs.next();
        doc != null;
        doc = await addedDocs.next()
      ) {
        console.log(doc._id);
        this.eventEmitter.emitAsync('sale', doc);
      }
      this.collectionSize = size;
    }
  }

  async readStoredEvents() {
    const cursor = this.saleModel.find().cursor();

    for (
      let doc = await cursor.next();
      doc != null;
      doc = await cursor.next()
    ) {
      this.eventEmitter.emitAsync('sale', doc);
    }
    console.log('All stored events read');
  }
}
