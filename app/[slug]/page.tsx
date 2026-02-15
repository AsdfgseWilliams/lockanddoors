import { client } from "@/lib/graphql";

async function getPage(slug: string) {
  const query = `
    query GetPage($uri: ID!) {
      page(id: $uri, idType: URI) {
        title
        content
      }
    }
  `;

  const variables = {
    uri: `/${slug}/`, // "/servicios/"
  };

  const data = await client.request(query, variables);
  return data.page;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ⬅️ Desestructuramos la promesa
  console.log("Slug recibido:", slug);

  const page = await getPage(slug);

  if (!page) {
    return <div>Página no encontrada</div>;
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  );
}

