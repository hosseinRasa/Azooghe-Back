import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'admin', // default/example value shown in Swagger
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '1qaz!QAZ', // default/example value
  })
  @IsString()
  @MinLength(6)
  password: string;
}
