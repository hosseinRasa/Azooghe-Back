import { PartialType } from '@nestjs/mapped-types';
import { ServicesCreateDto } from './services-create.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateServicesDto
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  extends PartialType(ServicesCreateDto) {}
