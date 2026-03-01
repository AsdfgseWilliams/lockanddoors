import Image from "next/image";
import Link from "next/link";

interface Ventaja {
  icono: string;
  texto: string;
}

interface VentajasProps {
  ventajas: Ventaja[];
  textoBoton1?: string;
  linkBoton1?: string;
  textoBoton2?: string;
  linkBoton2?: string;
}

export function Ventajas({ ventajas, textoBoton1, linkBoton1, textoBoton2, linkBoton2 }: VentajasProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Nuestras Ventajas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ventajas.map((ventaja, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition text-center">
              {ventaja.icono && (
                <div className="mb-6 flex justify-center">
                  {ventaja.icono.startsWith("http") ? (
                    <Image src={ventaja.icono} alt={ventaja.texto} width={64} height={64} className="w-16 h-16" />
                  ) : (
                    <span className={`dashicons ${ventaja.icono} text-6xl text-primary`} />
                  )}
                </div>
              )}
              <h3 className="text-xl font-bold">{ventaja.texto}</h3>
            </div>
          ))}
        </div>
        {(textoBoton1 || textoBoton2) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {textoBoton1 && linkBoton1 && (
              <Link
                href={linkBoton1}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition"
              >
                {textoBoton1}
              </Link>
            )}
            {textoBoton2 && linkBoton2 && (
              <Link
                href={linkBoton2}
                className="bg-white hover:bg-gray-100 border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold transition"
              >
                {textoBoton2}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}