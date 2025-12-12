import { Module } from '@nestjs/common';
import { ServiceChooseController } from './service-choose.controller';
import { ServiceChooseService } from './service-choose.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ServiceChooseDocument,
  ServicesChoose,
} from './schemas/services-choose.schema';
import { ClientsModule } from '../baseInformation/clients/clients.module';
import { ServicesModule } from '../baseInformation/services/services.module';

@Module({
  imports: [
    ClientsModule,
    ServicesModule,
    MongooseModule.forFeature([
      { name: ServicesChoose.name, schema: ServiceChooseDocument },
    ]),
  ],
  controllers: [ServiceChooseController],
  providers: [ServiceChooseService],
})
export class ServiceChooseModule {}
