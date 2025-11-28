import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
export type ClientsDocument = Clients & Document;
@Schema({ timestamps: true })
export class Clients {
  @Prop({ required: true, unique: true })
  clientCode: string;
  @Prop({ required: true })
  clientName: string;
}

export const ClientsSchema = SchemaFactory.createForClass(Clients);
