import { Test, TestingModule } from '@nestjs/testing';
import { AtencionService } from './atencion.service';

describe('AtencionService', () => {
  let service: AtencionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtencionService],
    }).compile();

    service = module.get<AtencionService>(AtencionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
