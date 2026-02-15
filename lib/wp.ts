import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("https://cms.locksanddoors24h.com/graphql");

export async function getMenu(location: string) {
  const query = gql`
    query GetMenu($location: MenuLocationEnum!) {
      menuItems(where: { location: $location }) {
        nodes {
          id
          label
          url
        }
      }
    }
  `;
  const data = await client.request(query, { location });
  return data.menuItems.nodes;
}
