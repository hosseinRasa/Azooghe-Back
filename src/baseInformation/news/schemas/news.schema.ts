import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
export type NewsDocument = News & Document;
@Schema({ timestamps: true })
export class News {
  @Prop({ unique: true, required: true })
  description: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
