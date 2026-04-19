import { ConfigureDocumentView } from "@/modules/Documents/presentation/views/ConfigureDocumentView";   
export default function Page({ params }: { params: { id_establecimiento: string } }) {
  return <ConfigureDocumentView id_establecimiento={params.id_establecimiento} />
}