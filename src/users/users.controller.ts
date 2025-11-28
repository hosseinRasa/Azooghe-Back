import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { DeleteResult } from 'mongoose';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { AllowAnonymous } from '../auth/common/decorators/allow-anonymous.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
@Controller('users')
@UseGuards(JwtAuthGuard) // <-- Protects the route
@ApiBearerAuth() // <-- This adds the lock icon in Swagger
export class UsersController {
  /**
   *
   */
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiQuery({ name: 'username', required: false })
  findAll(@Query('username') username?: string) {
    return this.usersService.findAll(username);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
  @Post()
  @AllowAnonymous()
  create(@Body(ValidationPipe) userCreateDto: UserCreateDto) {
    return this.usersService.create(userCreateDto);
  }
  @Post('/createWithImage')
  @AllowAnonymous()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      allOf: [
        { $ref: getSchemaPath(UserCreateDto) },
        {
          type: 'object',
          properties: {
            avatar: { type: 'string', format: 'binary' },
          },
        },
      ],
    },
  })
  @UseInterceptors(FileInterceptor('avatar', { storage: memoryStorage() }))
  async createWithImage(
    @Body() userCreateDto: UserCreateDto, // ValidationPipe removed
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    const user = await this.usersService.create(userCreateDto, avatar);

    // Only return safe fields
    return {
      id: user._id,
      username: user.username,
      avatarMimeType: user.avatarMimeType,
    };
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.delete(id);
  }
}
