import { NewsCreateDto } from './news-create.dto';
import { PartialType } from '@nestjs/mapped-types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateNewsDto
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  extends PartialType(NewsCreateDto) {}
