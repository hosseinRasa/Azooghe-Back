import { Module } from '@nestjs/common';
import { WorkCentersController } from './work-centers.controller';
import { WorkCentersService } from './work-centers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkCenters, WorkCentersSchema } from './schemas/work-centers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkCenters.name, schema: WorkCentersSchema },
    ]),
  ],
  controllers: [WorkCentersController],
  providers: [WorkCentersService],
})
export class WorkCentersModule {}
