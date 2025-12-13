import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ServicesCreateDto {
  @ApiProperty({
    name: 'serviceName',
    example: 'برنج', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'نام کالا/خدمات الزامی است' })
  serviceName: string;

  @IsNotEmpty({ message: 'واحد اندازه گیری الزامی است' })
  @ApiProperty({
    name: 'unitRef',
    example: '1', // default/example value shown in Swagger
  })
  unitRef: string;
  @IsNotEmpty({ message: 'حداکثر سفارش الزامی است' })
  @ApiProperty({
    name: 'maxOrder',
    example: '5', // default/example value shown in Swagger
  })
  maxOrder: number;
  @IsNotEmpty({ message: 'موجودی الزامی است' })
  @ApiProperty({
    name: 'qty',
    example: '5000', // default/example value shown in Swagger
  })
  qty: string;
  @IsNotEmpty({ message: 'قیمت واحد الزامی است' })
  @ApiProperty({
    name: 'price',
    example: '1000000', // default/example value shown in Swagger
  })
  price: string;
  @IsNotEmpty({ message: 'تاریخ انقضا الزامی است' })
  @ApiProperty({
    name: 'expireDate',
    example: '5000', // default/example value shown in Swagger
  })
  expireDate: string;

  @IsNotEmpty({ message: 'مشتری الزامی است' })
  @ApiProperty({
    name: 'clientRef',
    example: '12555698', // default/example value shown in Swagger
  })
  clientRef: string;

  @ApiProperty({
    name: 'requesterIp',
    example: '192.168.1.1', // default/example value shown in Swagger
    required: false,
  })
  requesterIp?: string;
  @ApiProperty({
    name: 'description',
    example: 'توضیحات', // default/example value shown in Swagger
    required: false,
  })
  description?: string;

  @ApiProperty({
    name: 'likeCount',
    example: '6', // default/example value shown in Swagger
    required: false,
  })
  likeCount?: number;
}
