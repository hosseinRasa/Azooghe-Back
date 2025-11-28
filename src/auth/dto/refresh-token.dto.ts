import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'token', // default/example value shown in Swagger
  })
  refreshToke: string;
}
