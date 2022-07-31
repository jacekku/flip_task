import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaleEvent } from 'src/schema/sale-event.schema';
import {
  TotalBoughtDate,
  TotalBoughtDateDocument,
} from 'src/schema/total-bought-date.schema';

@Injectable()
export class TotalBoughtDateService implements OnModuleInit {
  constructor(
    @InjectModel(TotalBoughtDate.name)
    private totalBoughtDateModel: Model<TotalBoughtDateDocument>,
  ) {}
  onModuleInit() {
    this.totalBoughtDateModel.collection.deleteMany({});
  }

  async incrementTotal(sale: SaleEvent) {
    const found = await this.totalBoughtDateModel.findOne({
      productId: sale.productId,
    });
    if (found == null) {
      const newProduct = new this.totalBoughtDateModel({
        productId: sale.productId,
        name: sale.name,
        day: sale.date.toLocaleDateString(),
        total: 1,
      });
      newProduct.save();
    } else {
      found.collection.updateOne(
        { productId: found.productId, day: found.day },
        { $inc: { total: 1 } },
      );
    }
  }

  top(day: string) {
    return this.totalBoughtDateModel
      .find({ day: day })
      .sort({ total: -1 })
      .limit(10);
  }
}
