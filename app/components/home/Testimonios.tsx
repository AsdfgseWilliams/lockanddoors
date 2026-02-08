// components/home/Testimonios.tsx (VERSIÓN CORREGIDA)
import Image from "next/image";

interface MediaItem {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

interface Testimonio {
  nombre: string;
  comentario: string;
  foto: MediaItem;
}

interface TestimoniosProps {
  titulo: string;
  testimonio1: Testimonio;
  testimonio2: Testimonio;
  testimonio3: Testimonio;
}

export function Testimonios({ titulo, testimonio1, testimonio2, testimonio3 }: TestimoniosProps) {
  const testimonios = [testimonio1, testimonio2, testimonio3].filter(Boolean);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {titulo}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonios.map((testimonio, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                {testimonio.foto?.node && (
                  <div className="relative w-16 h-16 mr-4">
                    <Image
                      src={testimonio.foto.node.sourceUrl}
                      alt={testimonio.foto.node.altText || testimonio.nombre}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-lg text-gray-900">
                    {testimonio.nombre}
                  </h4>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed">
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}