import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
  } from "@tanstack/react-query";
  import { fetchNoteById } from "@/lib/api";
  import NoteDetailsClient from "./NoteDetails.client";
  
  interface  NoteDetailsProps {
    params: Promise<{ id: string }>;
};
  
export async function generateMetadata({params}:NoteDetailsProps) {
  const { id } = await params;
  const note = await fetchNoteById(parseInt(id));
  return {
    title: `Notehub - ${note.title}`,
  description: `${note.content}`,
  openGraph: {
    title: `Notehub - ${note.title}`,
    description: `${note.content}`,
    url: "",
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: 'article',
  },
  }
}
  
  export default async function NoteDetails({params} : NoteDetailsProps) {
    const { id } = await params;
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery({
      queryKey: ["Note", parseInt(id)],
      queryFn: () => fetchNoteById(parseInt(id)),
    });
  
  
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    );
  };
  

  

