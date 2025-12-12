import { PartialType } from '@nestjs/mapped-types';
import { WorkCentersCreateDto } from './work-centers-create.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateWorkCentersDto
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  extends PartialType(WorkCentersCreateDto) {}
