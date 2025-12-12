import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OrgansCreateDto {
  @ApiProperty({
    name: 'code',
    example: '1', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'کد سازمان الزامی است' })
  code: string;
  @ApiProperty({
    name: 'organName',
    example: 'سازمان نمونه', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'نام سازمان الزامی است' })
  organName: string;
  @ApiProperty({
    name: 'organPhone',
    example: '25436', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'تلفن سازمان الزامی است' })
  organPhone: string;
}
