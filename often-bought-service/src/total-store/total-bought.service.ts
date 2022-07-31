import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaleEvent } from 'src/schema/sale-event.schema';
import {
  TotalBought,
  TotalBoughtDocument,
} from 'src/schema/total-bought.schema';

@Injectable()
export class TotalBoughtService implements OnModuleInit {
  constructor(
    @InjectModel(TotalBought.name)
    private totalBoughtModel: Model<TotalBoughtDocument>,
  ) {}
  onModuleInit() {
    this.totalBoughtModel.collection.drop();
  }

  async incrementTotal(sale: SaleEvent) {
    const found = await this.totalBoughtModel.findOne({
      productId: sale.productId,
    });
    if (found == null) {
      const newProduct = new this.totalBoughtModel({
        productId: sale.productId,
        name: sale.name,
        total: 1,
      });
      newProduct.save();
    } else {
      found.collection.updateOne(
        { productId: found.productId },
        { $inc: { total: 1 } },
      );
    }
  }

  top() {
    return this.totalBoughtModel.find().sort({ total: -1 }).limit(10);
  }
}
