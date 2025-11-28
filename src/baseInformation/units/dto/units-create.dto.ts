import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UnitsCreateDto {
  @ApiProperty({
    name: 'unitName',
    example: 'کیلوگرم', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'نام واحد الزامی است' })
  unitName: string;
}
