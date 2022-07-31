import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SaleEventDocument = SaleEvent & Document;

@Schema()
export class SaleEvent {
  @Prop({ required: true })
  saleId: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;
}

export const SaleEventSchema = SchemaFactory.createForClass(SaleEvent);

SaleEventSchema.index(
  {
    saleId: 1,
    productId: 1,
  },
  { unique: true },
);
