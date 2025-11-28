import { Module } from '@nestjs/common';
import { OrgansController } from './organs.controller';
import { OrgansService } from './organs.service';
import { Organs, OrgansSchema } from './schemas/organs.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Organs.name, schema: OrgansSchema }]),
  ],
  controllers: [OrgansController],
  providers: [OrgansService],
})
export class OrgansModule {}
