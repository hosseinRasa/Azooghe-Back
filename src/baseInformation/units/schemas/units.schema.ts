import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
export type UnitsDocument = Units & Document;
@Schema({ timestamps: true })
export class Units {
  @Prop({ unique: true, required: true })
  unitName: string;
}

export const UnitsSchema = SchemaFactory.createForClass(Units);
