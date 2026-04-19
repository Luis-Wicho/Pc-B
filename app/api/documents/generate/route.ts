import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import { createClient } from '@/utils/supabase/server'; // Asegúrate de que esta ruta sea la de tu proyecto

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { establishment, config, amount } = body;

    // 1. Iniciamos el cliente de la base de datos
    const supabase = await createClient();

    // 2. Lógica de generación de PDF (Tal como ya te funciona)
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));

    // --- ENCABEZADO ---
    doc.fontSize(20).text('PROTECCIÓN CIVIL Y BOMBEROS', { align: 'center' });
    doc.fontSize(14).text('IZÚCAR DE MATAMOROS, PUEBLA', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'right' });
    doc.text(`No. Expediente: ${establishment.no_expediente}`, { align: 'right' });
    doc.moveDown();

    // --- CUERPO ---
    doc.fontSize(16).text(config.servicio.toUpperCase(), { align: 'center', underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Por medio de la presente, se hace constar la información del establecimiento:`);
    doc.moveDown(0.5);
    
    doc.rect(50, doc.y, 500, 80).stroke();
    const currentY = doc.y + 10;
    doc.text(`Nombre: ${establishment.nombre_establecimiento}`, 60, currentY);
    doc.text(`Propietario: ${establishment.nombre_propietario || 'No proporcionado'}`, 60, currentY + 20);
    doc.text(`Giro: ${establishment.giro || 'General'}`, 60, currentY + 40);
    doc.text(`Tamaño: ${establishment.tamanio}`, 60, currentY + 60);
    doc.moveDown(5);

    if (config.servicio === 'Orden de Pago') {
      doc.fontSize(14).text('DETALLES DE COBRO', { underline: true });
      doc.fontSize(12).text(`Vigencia: ${config.vigencia}`);
      doc.font('Helvetica-Bold').text(`Monto a pagar: $${amount}.00 MXN`);
      doc.font('Helvetica');
      doc.moveDown();
    }

    // --- PIE DE PÁGINA ---
    const footerY = 700;
    doc.moveTo(150, footerY).lineTo(450, footerY).stroke();
    doc.text('FIRMA DE AUTORIZACIÓN', 150, footerY + 10, { align: 'center', width: 300 });

    doc.end();

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    });

    // 3. NUEVO: Guardar en la tabla document_history (Post-condición)
    // Esto registra la operación antes de enviar el archivo al usuario
    const { error: dbError } = await supabase
      .from('document_history')
      .insert([
        { 
          id_establecimiento: establishment.id_establecimiento,
          no_expediente: establishment.no_expediente,
          tipo_documento: config.servicio,
          monto_calculado: amount,
          estatus_pago: config.servicio === 'Orden de Pago' ? 'Pendiente' : 'Pagado'
        }
      ]);

    if (dbError) {
      console.error("Error guardando historial:", dbError);
      // Opcional: podrías decidir si cancelar la descarga o solo loguear el error
    }

    // 4. Retornar el PDF para descarga
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${config.servicio}_${establishment.no_expediente}.pdf`,
      },
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al generar PDF' }, { status: 500 });
  }
}