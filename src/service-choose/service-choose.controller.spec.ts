import { Test, TestingModule } from '@nestjs/testing';
import { ServiceChooseController } from './service-choose.controller';

describe('ServiceChooseController', () => {
  let controller: ServiceChooseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceChooseController],
    }).compile();

    controller = module.get<ServiceChooseController>(ServiceChooseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
