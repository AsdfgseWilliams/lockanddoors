import { client } from "@lib/graphql";
import { gql } from "graphql-request";
import Hero from "@components/home/Hero";
import { getRankMathSEO } from "@lib/seo";

interface MediaItem { node: { sourceUrl: string; altText: string } }
interface HeroData { titulo: string; subtitulo: string; fondo: MediaItem; textoBoton1: string; enlaceBoton1: string; textoBoton2: string; enlaceBoton2: string }
interface HomeACF { hero: HeroData }
interface PageData { page: { title: string; home: HomeACF } }

export async function generateMetadata() {
  return await getRankMathSEO(2); // Aquí el ID de tu página
}

export default async function Home() {
  const query = gql`
    query GetHomePage {
      page(id: 2, idType: DATABASE_ID) {
        title
        home { hero { titulo subtitulo fondo { node { sourceUrl altText } } textoBoton1 enlaceBoton1 textoBoton2 enlaceBoton2 } }
      }
    }
  `;
  const data = await client.request<PageData>(query);
  const { hero } = data.page.home;

  return (
    <div className="min-h-screen">
      <Hero hero={hero} />
    </div>
  );
}
