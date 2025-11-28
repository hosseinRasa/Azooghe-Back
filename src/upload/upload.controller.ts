/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @ApiConsumes('multipart/form-data') // ✅ tells Swagger this endpoint uses form-data
  @ApiBody({
    description: 'Upload a single file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // ✅ this makes Swagger show a file chooser
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // optional size limit
    }),
  )
  @UseGuards(JwtAuthGuard) // <-- Protects the route
  @ApiBearerAuth() // <-- This adds the lock icon in Swagger
  async uploadFile(@UploadedFile() file?: Express.Multer.File) {
    if (!file || typeof file.filename !== 'string') {
      throw new BadRequestException('No file uploaded');
    }

    const uploadedFile = await this.uploadService.handleLocalFile(file);
    return {
      message: 'File uploaded successfully ✅',
      file: uploadedFile,
    };
  }
}
