import { ConfigureDocumentView } from "@/modules/Documents/presentation/views/ConfigureDocumentView";

// 1. Convertimos la función en 'async'
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  
  // 2. Esperamos a que los parámetros se resuelvan (desenvolver la Promesa)
  const resolvedParams = await params;
  
  // 3. Ahora sí, pasamos el id real a la vista
  return <ConfigureDocumentView id_establecimiento={resolvedParams.id} />;
}