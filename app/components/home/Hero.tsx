import Image from "next/image";
import Link from "next/link";

interface MediaItem { node: { sourceUrl: string; altText: string } }
interface HeroProps { hero: { titulo: string; subtitulo: string; fondo: MediaItem; textoBoton1: string; enlaceBoton1: string; textoBoton2: string; enlaceBoton2: string } }

export default function Hero({ hero }: HeroProps) {
  return (
    <section className="-mt-16 relative h-screen flex items-center justify-center">
      {hero.fondo?.node && <Image src={hero.fondo.node.sourceUrl} alt={hero.fondo.node.altText} fill className="object-cover" priority />}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{hero.titulo}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{hero.subtitulo}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {hero.textoBoton1 && hero.enlaceBoton1 && <Link href={hero.enlaceBoton1} className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition">{hero.textoBoton1}</Link>}
          {hero.textoBoton2 && hero.enlaceBoton2 && <Link href={hero.enlaceBoton2} className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold transition">{hero.textoBoton2}</Link>}
        </div>
      </div>
    </section>
  );
}
