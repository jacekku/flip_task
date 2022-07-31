import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TotalBought, TotalBoughtSchema } from 'src/schema/total-bought.schema';
import { TotalBoughtService } from './total-bought.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TotalBought.name, schema: TotalBoughtSchema },
    ]),
  ],
  providers: [TotalBoughtService],
  exports: [TotalBoughtService],
})
export class TotalBoughtModule {}
