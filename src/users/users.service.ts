import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { DeleteResult, Model } from 'mongoose';
import { UpdateUserDto } from './dto/user-update.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findAll(username?: string) {
    if (username) {
      const user = await this.userModel.findOne({
        username: username?.toLowerCase(),
      });

      if (user) {
        return user;
      } else return null;
    }
    return await this.userModel.find();
  }
  async login(username: string, password: string) {
    const user = await this.userModel.findOne({
      username: username.toLowerCase(),
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password!);

      if (!isMatch) {
        return null; // Wrong password
      } else return user;
    } else return null;
  }
  async findById(id: string) {
    return await this.userModel.findById(id);
  }
  async findUserRoles() {
    return await this.userModel.find({}, { username: 1, password: 2, _id: 0 });
  }
  async create(userCreateDto: UserCreateDto, file?: Express.Multer.File) {
    userCreateDto.password = await bcrypt.hash(
      userCreateDto.password,
      await bcrypt.genSalt(),
    );
    return await new this.userModel({
      ...userCreateDto,
      avatar: file?.buffer, // multer must provide buffer
      avatarMimeType: file?.mimetype,
    }).save();
  }
  async update(id: string, updatedUser: UpdateUserDto) {
    updatedUser.password = await bcrypt.hash(
      updatedUser.password as string,
      await bcrypt.genSalt(),
    );
    return await this.userModel.updateOne(
      { _id: Object(id) }, // filter
      { $set: { ...updatedUser } },
    ); // fields to update
  }
  async delete(id: string): Promise<DeleteResult> {
    return await this.userModel.deleteOne({ _id: Object(id) }, {});
  }
}
