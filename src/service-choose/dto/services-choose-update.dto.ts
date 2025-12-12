import { PartialType } from '@nestjs/mapped-types';
import { ServicesChooseCreateDto } from './services-choose-create.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateServicesChooseDto
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  extends PartialType(ServicesChooseCreateDto) {}
