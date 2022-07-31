import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaleEvent } from 'src/schema/sale-event.schema';
import {
  TotalProfitable,
  TotalProfitableDocument,
} from 'src/schema/total-profitable.schema';

@Injectable()
export class TotalProfitableService implements OnModuleInit {
  constructor(
    @InjectModel(TotalProfitable.name)
    private totalProfitableModel: Model<TotalProfitableDocument>,
  ) {}
  onModuleInit() {
    this.totalProfitableModel.collection.deleteMany({});
  }

  async incrementTotal(sale: SaleEvent) {
    const found = await this.totalProfitableModel.findOne({
      productId: sale.productId,
    });
    if (found == null) {
      const newProduct = new this.totalProfitableModel({
        productId: sale.productId,
        name: sale.name,
        total: sale.quantity * sale.price,
      });
      newProduct.save();
    } else {
      found.collection.updateOne(
        { productId: found.productId },
        { $inc: { total: sale.quantity * sale.price } },
      );
    }
  }

  top() {
    return this.totalProfitableModel.find().sort({ total: -1 }).limit(10);
  }
}
