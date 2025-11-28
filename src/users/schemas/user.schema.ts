import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop()
  avatar?: Buffer;
  @Prop()
  avatarMimeType?: string;
  @Prop({ unique: true, required: true })
  username: string;
  @Prop({ required: true })
  @Exclude()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});
