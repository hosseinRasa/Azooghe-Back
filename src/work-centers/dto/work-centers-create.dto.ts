import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WorkCentersCreateDto {
  @ApiProperty({
    name: 'workCenterName',
    example: 'کیلوگرم', // default/example value shown in Swagger
  })
  @IsNotEmpty({ message: 'نام مرکز الزامی است' })
  workCenterName: string;
}
