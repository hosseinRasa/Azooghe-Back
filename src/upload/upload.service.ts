/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class UploadService {
  /**
   * Handle a single uploaded file
   * @param file - Express.Multer.File object
   * @returns file metadata including URL for browser access
   */
  async handleLocalFile(file: Express.Multer.File) {
    // Optional: verify the file exists (extra safety)
    const filePath = file.path ?? join('uploads', file.filename);
    try {
      await fs.access(filePath); // throws if file does not exist
    } catch {
      throw new Error('Uploaded file not found on disk');
    }

    return {
      originalName: file.originalname,
      filename: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      path: filePath,
      url: `/uploads/${file.filename}`, // ServeStaticModule will allow browser access
    };
  }
}
