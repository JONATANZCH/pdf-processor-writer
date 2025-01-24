import { Controller, Get, Res, HttpException, HttpStatus } from '@nestjs/common';
import { PdfProcessorService } from './pdf-processor.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfProcessorController {
  constructor(private readonly pdfProcessorService: PdfProcessorService) {}

  @Get('generate')
  async generatePdf(@Res() res: Response) {
    try {
      const pdfBuffer = await this.pdfProcessorService.generatePdf();
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="filled-form.pdf"',
      });
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new HttpException(
        'Failed to generate PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
