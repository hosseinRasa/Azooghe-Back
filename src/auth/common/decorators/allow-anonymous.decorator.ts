import { SetMetadata } from '@nestjs/common';
import { ALLOW_ANONYMOUS } from '../constants/constants';

export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS, true);
