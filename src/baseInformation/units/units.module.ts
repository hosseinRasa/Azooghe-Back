import { Module } from '@nestjs/common';
import { UnitsController } from './units.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Units, UnitsSchema } from './schemas/units.schema';
import { UnitsService } from './units.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Units.name, schema: UnitsSchema }]),
  ],
  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule {}
