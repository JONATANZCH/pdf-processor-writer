import { Test, TestingModule } from '@nestjs/testing';
import { PdfProcessorService } from './pdf-processor.service';

describe('PdfProcessorService', () => {
  let service: PdfProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfProcessorService],
    }).compile();

    service = module.get<PdfProcessorService>(PdfProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
