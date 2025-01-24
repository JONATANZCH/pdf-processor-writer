import { Controller, Get, Res } from '@nestjs/common';
import { PdfProcessorService } from './pdf-processor.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfProcessorController {
  constructor(private readonly pdfProcessorService: PdfProcessorService) {}

  @Get('generate')
  async generatePdf(@Res() res: Response) {
    const pdfBuffer = await this.pdfProcessorService.generatePdf();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="filled-form.pdf"',
    });
    res.send(pdfBuffer);
  }
}
