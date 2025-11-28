import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Services, ServicesSchema } from './schemas/services.schema';
import { ServicesService } from './services.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Services.name, schema: ServicesSchema },
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
