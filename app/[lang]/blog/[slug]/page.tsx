import { client } from "@lib/graphql";
import { gql } from "graphql-request";

interface Props {
  params: { slug: string };
}

export default async function PostPage({ params }: Props) {
  const query = gql`
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        content
      }
    }
  `;

  const data = await client.request(query, { slug: params.slug });

  return (
    <main>
      <h1>{data.post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
    </main>
  );
}