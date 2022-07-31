import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TotalProfitableDocument = TotalProfitable & Document;

@Schema()
export class TotalProfitable {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  total: number;
}

export const TotalProfitableSchema =
  SchemaFactory.createForClass(TotalProfitable);
