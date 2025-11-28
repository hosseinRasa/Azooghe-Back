import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'admin', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'نام کاربری الزامی است' })
  username: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '1qaz!QAZ', // default/example value shown in Swagger
  })
  @IsStrongPassword({}, { message: 'رمز عبور  ساده است' })
  @IsNotEmpty({ message: 'رمز عبور الزامی است' })
  password: string;
}
