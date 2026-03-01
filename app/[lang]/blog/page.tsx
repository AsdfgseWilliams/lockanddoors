import { client } from "@lib/graphql";
import { gql } from "graphql-request";

const query = gql`
{
  posts {
    nodes {
      id
      title
      slug
    }
  }
}
`;

export default async function Blog() {
  const data = await client.request(query);

  return (
    <main>
      {data.posts.nodes.map((post:any) => (
        <a key={post.id} href={`/blog/${post.slug}`}>
          {post.title}
        </a>
      ))}
    </main>
  );
}