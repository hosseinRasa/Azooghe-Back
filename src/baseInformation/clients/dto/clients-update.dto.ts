import { PartialType } from '@nestjs/mapped-types';
import { ClientsCreateDto } from './clients-create.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateClientsDto
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  extends PartialType(ClientsCreateDto) {}
