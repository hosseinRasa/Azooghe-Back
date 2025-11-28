import { PartialType } from '@nestjs/mapped-types';
import { UnitsCreateDto } from './units-create.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateUnitsDto
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  extends PartialType(UnitsCreateDto) {}
