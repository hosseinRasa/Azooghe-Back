import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ClientsCreateDto {
  @ApiProperty({
    description: 'clientCode',
    example: '123', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'کد مشتری الزامی است' })
  clientCode: string;
  @ApiProperty({
    description: 'clientName',
    example: 'مشتری شماره یک', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'نام مشتری الزامی است' })
  clientName: string;
}
