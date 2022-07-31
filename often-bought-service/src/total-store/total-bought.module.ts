import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TotalBoughtDate,
  TotalBoughtDateSchema,
} from 'src/schema/total-bought-date.schema';
import { TotalBought, TotalBoughtSchema } from 'src/schema/total-bought.schema';
import {
  TotalProfitable,
  TotalProfitableSchema,
} from 'src/schema/total-profitable.schema';
import { TotalBoughtDateService } from './total-bought-date.service';
import { TotalBoughtService } from './total-bought.service';
import { TotalProfitableService } from './total-profitable.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TotalBought.name, schema: TotalBoughtSchema },
      { name: TotalProfitable.name, schema: TotalProfitableSchema },
      { name: TotalBoughtDate.name, schema: TotalBoughtDateSchema },
    ]),
  ],
  providers: [
    TotalBoughtService,
    TotalProfitableService,
    TotalBoughtDateService,
  ],
  exports: [TotalBoughtService, TotalProfitableService, TotalBoughtDateService],
})
export class TotalBoughtModule {}
