import { gql } from "graphql-request";
import { client } from "./graphql";

/**
 * Obtiene SEO de cualquier página usando Rank Math
 */
export async function getRankMathSEO(pageId: number) {
  const query = gql`
    query GetPageSEO($id: ID!) {
      page(id: $id, idType: DATABASE_ID) {
        seo {
          title
          description
        }
      }
    }
  `;

  const data = await client.request(query, { id: pageId });

  return {
    title: data.page.seo.title || "",
    description: data.page.seo.description || "",
  };
}
