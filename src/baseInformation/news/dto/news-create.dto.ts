import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewsCreateDto {
  @ApiProperty({
    description: 'Dscp of the news',
    example: 'این یک خبر جدید است.', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'متن خبر الزامی است' })
  description: string;
}
