import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TotalBoughtDateDocument = TotalBoughtDate & Document;

@Schema()
export class TotalBoughtDate {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  day: string;

  @Prop()
  total: number;
}

export const TotalBoughtDateSchema =
  SchemaFactory.createForClass(TotalBoughtDate);
