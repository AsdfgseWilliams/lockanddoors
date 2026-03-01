import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("https://cms.locksanddoors24h.com/graphql");

export async function getMenu(lang: string = 'es') {
  const locationMap: Record<string, string> = {
    es: 'PRIMARY',
    en: 'PRIMARY___EN',
  }

  const location = locationMap[lang] ?? 'PRIMARY'

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

export type RankMathRedirection = {
  fromUrl: string
  toUrl: string
  redirectType: number | null
}

export type RankMathRedirectionsResponse = {
  data: {
    rankMathRedirections: {
      nodes: RankMathRedirection[]
    }
  }
}
