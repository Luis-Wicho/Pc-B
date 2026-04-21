import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import { createClient } from '@/utils/supabase/server'; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { establishment, config, amount } = body;

    // 1. Inicializamos Supabase
    const supabase = await createClient();

    // 2. Configuración del PDF
    // IMPORTANTE: Definir la fuente estándar directamente en el objeto de opciones
    // obliga a PDFKit a usar sus glifos internos sin buscar archivos .afm físicos.
    const doc = new PDFDocument({ 
      margin: 50,
      bufferPages: true,
      font: 'Helvetica-Bold' // Usamos Bold para asegurar la carga inicial
    });

    const chunks: any[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));

    // --- DISEÑO DEL PDF ---
    doc.fontSize(20).text('PROTECCIÓN CIVIL Y BOMBEROS', { align: 'center' });
    doc.fontSize(14).text('IZÚCAR DE MATAMOROS, PUEBLA', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(12).font('Helvetica').text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'right' });
    doc.text(`No. Expediente: ${establishment.no_expediente}`, { align: 'right' });
    doc.moveDown();

    const titulo = (config.servicio || 'Documento').toUpperCase();
    doc.fontSize(16).font('Helvetica-Bold').text(titulo, { align: 'center', underline: true });
    doc.moveDown();
    
    doc.fontSize(12).font('Helvetica').text(`Información del establecimiento:`);
    doc.moveDown(0.5);
    
    // Cuadro de datos
    doc.rect(50, doc.y, 500, 80).stroke();
    const yPos = doc.y + 10;
    doc.text(`Nombre: ${establishment.nombre_establecimiento}`, 60, yPos);
    doc.text(`Propietario: ${establishment.nombre_propietario || 'N/A'}`, 60, yPos + 20);
    doc.text(`Giro: ${establishment.giro_comercial || establishment.giro || 'General'}`, 60, yPos + 40);
    doc.text(`Tamaño: ${establishment.tamanio || 'No especificado'}`, 60, yPos + 60);
    
    doc.moveDown(6);

    if (config.servicio === 'Orden de Pago') {
      doc.fontSize(14).font('Helvetica-Bold').text('DETALLES DE COBRO', { underline: true });
      doc.fontSize(12).font('Helvetica').text(`Vigencia: ${config.vigencia}`);
      doc.font('Helvetica-Bold').text(`Monto a pagar: $${amount}.00 MXN`);
    }

    // Finalización
    doc.end();

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    });

    // 3. REGISTRO (Opcional - Descoméntalo si tu tabla está lista)
    
    await supabase.from('document_history').insert([{ 
      id_establecimiento: establishment.id_establecimiento,
      tipo_documento: config.servicio,
      monto_calculado: amount,
      no_expediente: establishment.no_expediente
    }]);
    

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Documento_${establishment.no_expediente}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error("ERROR EN SERVIDOR:", error.message);
    return NextResponse.json({ error: 'Fallo al generar PDF' }, { status: 500 });
  }
}