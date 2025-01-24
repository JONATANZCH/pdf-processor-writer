import { Module } from '@nestjs/common';
import { PdfProcessorController } from './pdf-processor.controller';
import { PdfProcessorService } from './pdf-processor.service';

@Module({
  controllers: [PdfProcessorController],
  providers: [PdfProcessorService],
})
export class PdfProcessorModule {}
