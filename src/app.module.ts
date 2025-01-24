import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfProcessorModule } from './pdf-processor/pdf-processor.module';

@Module({
  imports: [PdfProcessorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
