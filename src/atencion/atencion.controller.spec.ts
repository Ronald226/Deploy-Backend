import { Test, TestingModule } from '@nestjs/testing';
import { AtencionController } from './atencion.controller';
import { AtencionService } from './atencion.service';

describe('AtencionController', () => {
  let controller: AtencionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtencionController],
      providers: [AtencionService],
    }).compile();

    controller = module.get<AtencionController>(AtencionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
