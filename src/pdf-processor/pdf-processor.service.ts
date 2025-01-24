import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { PDFDocument } from 'pdf-lib';

@Injectable()
export class PdfProcessorService {
  async generatePdf(): Promise<Buffer> {
    const pdfPath = 'src/assets/nuevo-formato-plan-sin-deducible.pdf';

    try {
      const existingPdfBytes = await readFile(pdfPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      console.log('Campos disponibles en el PDF:');
      fields.forEach(field => console.log(' -', field.getName()));

      const textFields = [
        { name: 'Texto1', value: 'Juan Pérez' },
        { name: 'Texto2', value: '123456789' },
        { name: 'Texto3', value: '01/01/2025' },
        { name: 'Texto4', value: 'Ciudad de México' },
        { name: 'Texto5', value: 'Asegurado' },
        { name: 'Texto6', value: 'Ejemplo de campo 6' },
        { name: 'Texto7', value: 'Ejemplo de campo 7' },
        { name: 'Texto18', value: 'Información adicional' },
        { name: 'Texto19', value: 'Datos importantes' },
        { name: 'Texto20', value: 'Otro campo lleno' },
        { name: 'Texto21', value: 'Prueba campo 21' },
        { name: 'Texto22', value: 'Campo dinámico 22' },
        { name: 'Texto23', value: 'Ejemplo campo 23' },
        { name: 'Texto24', value: 'Valor en campo 24' },
        { name: 'Texto27', value: 'Texto para el campo 27' },
        { name: 'Texto39', value: 'Información del campo 39' },
        { name: 'Texto40', value: 'Campo dinámico 40' },
        { name: 'Texto41', value: 'Llenado automático 41' },
        { name: 'Texto42', value: 'Campo 42 completado' },
        { name: 'Texto43', value: 'Texto dinámico 43' },
        { name: 'Texto44', value: 'Ejemplo para 44' },
        { name: 'Texto9', value: 'Texto para el campo 9' },
        { name: 'Texto8', value: 'Texto para el campo 8' },
        { name: 'Texto10', value: 'Texto dinámico 10' },
        { name: 'Texto11', value: 'Prueba de texto 11' },
        { name: 'Texto12', value: 'Último campo lleno' },
      ];

      textFields.forEach(({ name, value }) => {
        const field = form.getFieldMaybe(name);
        if (field) {
          form.getTextField(name).setText(value);
        } else {
          console.warn(`El campo de texto "${name}" no existe en el formulario.`);
        }
      });
  
      const checkBoxNames = [
        'Casilla de verificación7',
        'Casilla de verificación8',
        'Casilla de verificación9',
        'Casilla de verificación12',
        'Casilla de verificación13',
        'Casilla de verificación14',
        'Casilla de verificación15',
        'Casilla de verificación16',
        'Casilla de verificación17',
        'Casilla de verificación19',
        'Casilla de verificación21',
        'Casilla de verificación1',
        'Casilla de verificación2',
        'Casilla de verificación3',
        'Casilla de verificación10',
        'Casilla de verificación4',
      ];

      checkBoxNames.forEach(name => {
        const field = form.getFieldMaybe(name);
        if (field) {
          form.getCheckBox(name).check();
        } else {
          console.warn(`La casilla de verificación "${name}" no existe en el formulario.`);
        }
      });

      const pdfBytes = await pdfDoc.save();

      return Buffer.from(pdfBytes);
    } catch (error) {
      console.error('Error al procesar el PDF:', error);
      throw new Error('No se pudo generar el PDF.');
    }
  }
}
