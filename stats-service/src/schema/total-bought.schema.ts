import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TotalBoughtDocument = TotalBought & Document;

@Schema()
export class TotalBought {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  total: number;
}

export const TotalBoughtSchema = SchemaFactory.createForClass(TotalBought);
