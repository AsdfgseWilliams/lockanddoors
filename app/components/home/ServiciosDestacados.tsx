import Image from "next/image";

interface Servicio {
  id: string;
  title: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface ServiciosProps {
  servicios: Servicio[];
}

export function Servicios({ servicios }: ServiciosProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Nuestros Servicios</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              {servicio.featuredImage?.node && (
                <div className="mb-6 relative h-48 w-full">
                  <Image
                    src={servicio.featuredImage.node.sourceUrl}
                    alt={servicio.featuredImage.node.altText || servicio.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <h3 className="text-2xl font-bold mb-3">{servicio.title}</h3>
              <div
                className="text-gray-600 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: servicio.excerpt }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}