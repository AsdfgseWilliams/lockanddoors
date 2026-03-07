// UrgenciasSection.tsx
interface BotonResuelto {
  href: string;
  label: string;
}

interface UrgenciasSectionProps {
  titulo: string;
  subtitulo: string;
  boton1: BotonResuelto | null;
  boton2: BotonResuelto | null;
}

export default function UrgenciasSection({ titulo, subtitulo, boton1, boton2 }: UrgenciasSectionProps) {
  return (
    <section className="bg-primary py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-h2 font-bold text-white mb-4">{titulo}</h2>
        <p className="text-white/80 text-body max-w-2xl mx-auto mb-10">{subtitulo}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {boton1 && (
            <a href={boton1.href} className="inline-flex items-center justify-center gap-2 bg-secondary text-white font-bold text-lg px-8 py-4 rounded-lg hover:opacity-90 transition-opacity">
              {boton1.label}
            </a>
          )}
          {boton2 && (
            <a href={boton2.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold text-lg px-8 py-4 rounded-lg hover:opacity-90 transition-opacity">
              {boton2.label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}