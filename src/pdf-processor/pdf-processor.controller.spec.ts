import { Test, TestingModule } from '@nestjs/testing';
import { PdfProcessorController } from './pdf-processor.controller';

describe('PdfProcessorController', () => {
  let controller: PdfProcessorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfProcessorController],
    }).compile();

    controller = module.get<PdfProcessorController>(PdfProcessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
