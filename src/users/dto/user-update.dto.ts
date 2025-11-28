import { UserCreateDto } from './user-create.dto';
import { PartialType } from '@nestjs/mapped-types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateUserDto
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  extends PartialType(UserCreateDto) {}
