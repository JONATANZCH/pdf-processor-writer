import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfProcessorService {
  async generatePdf(): Promise<Buffer> {
    // Ruta del archivo PDF base
    const pdfPath = path.resolve(
      __dirname,
      '../assets/nuevo-formato-plan-sin-deducible.pdf',
    );

    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Datos simulados
    const formData = {
      'Nombre completo': 'Juan Pérez',
      'RFC del asegurado': 'PEJU850101AB1',
      'Fecha del Siniestro': '2025-01-15',
      'Correo electrónico': 'juan.perez@example.com',
      Teléfono: '555-123-4567',
    };

    // Llenar los campos del formulario en el PDF
    const form = pdfDoc.getForm();
    form.getTextField('Nombre completo').setText(formData['Nombre completo']);
    form
      .getTextField('RFC del asegurado')
      .setText(formData['RFC del asegurado']);
    form
      .getTextField('Fecha del Siniestro')
      .setText(formData['Fecha del Siniestro']);
    form
      .getTextField('Correo electrónico')
      .setText(formData['Correo electrónico']);
    form.getTextField('Teléfono').setText(formData['Teléfono']);

    // Guardar el PDF modificado
    const pdfBytesFilled = await pdfDoc.save();
    return Buffer.from(pdfBytesFilled);
  }
}
