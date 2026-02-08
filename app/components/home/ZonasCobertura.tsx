import Link from "next/link";

interface Zona {
  id: string;
  title: string;
  slug: string;
}

interface ZonasProps {
  zonas: Zona[];
}

export function ZonasCobertura({ zonas }: ZonasProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Zonas de Cobertura</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {zonas.map((zona) => (
            <Link
              key={zona.id}
              href={`/ubicacion/${zona.slug}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition text-center group"
            >
              <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{zona.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}