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
    description: 'کد سازمان',
    example: '123', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'کد سازمان الزامی است' })
  organRef: string;

  @ApiProperty({
    description: 'کد مرکز',
    example: '123', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'کد مرکز الزامی است' })
  workCenterRef: string;

  @ApiProperty({
    description: 'nationalCode',
    example: '123456789', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'کد ملی الزامی است' })
  nationalCode: string;
  @ApiProperty({
    description: 'clientName',
    example: 'مشتری شماره یک', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'نام مشتری الزامی است' })
  clientName: string;
}
