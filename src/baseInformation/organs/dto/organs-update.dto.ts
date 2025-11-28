import { PartialType } from '@nestjs/mapped-types';
import { OrgansCreateDto } from './organs-create.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateOrgansDto
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  extends PartialType(OrgansCreateDto) {}
