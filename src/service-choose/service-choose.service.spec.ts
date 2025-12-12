import { Test, TestingModule } from '@nestjs/testing';
import { ServiceChooseService } from './service-choose.service';

describe('ServiceChooseService', () => {
  let service: ServiceChooseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceChooseService],
    }).compile();

    service = module.get<ServiceChooseService>(ServiceChooseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
