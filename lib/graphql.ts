import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_WP_API!, {
  fetch: (url, options) =>
    fetch(url, {
      ...options,
      next: { tags: ['wordpress-content'] },
    }),
});