'use client'

import { usePresupuestoForm } from '@/lib/hooks/usePresupuestoForm'

interface Props {
  servicio?: string   // se pasa desde cada página para contexto
}

export function FormPresupuesto({ servicio }: Props) {
  const { form, status, onSubmit } = usePresupuestoForm(servicio)
  const { register, formState: { errors } } = form

  return (
    <section className="bg-[var(--color-surface)] py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Formulario */}
        <div>
          <h2 className="text-h2 font-bold text-[var(--color-primary)] mb-2">
            Solicita tu presupuesto
          </h2>
          <p className="text-[var(--color-text-light)] mb-8">
            Sin compromiso. Te respondemos en menos de 30 minutos.
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  {...register('nombre', { required: 'Nombre obligatorio' })}
                  placeholder="Nombre completo"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-secondary)]"
                />
                {errors.nombre && (
                  <span className="text-red-500 text-xs mt-1">{errors.nombre.message}</span>
                )}
              </div>
              <div>
                <input
                  {...register('telefono', { required: 'Teléfono obligatorio' })}
                  placeholder="Teléfono"
                  type="tel"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-secondary)]"
                />
                {errors.telefono && (
                  <span className="text-red-500 text-xs mt-1">{errors.telefono.message}</span>
                )}
              </div>
            </div>

            <input
              {...register('email')}
              placeholder="Email (opcional)"
              type="email"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-secondary)]"
            />

            <textarea
              {...register('mensaje')}
              placeholder="Cuéntanos qué necesitas..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-secondary)] resize-none"
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[var(--color-secondary)] text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar consulta'}
            </button>

            {status === 'ok' && (
              <p className="text-green-600 text-sm text-center">
                ✓ Mensaje enviado. Te contactamos en breve.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">
                Error al enviar. Llámanos al 644 189 289.
              </p>
            )}
          </form>
        </div>

        {/* CTA lateral — emergencias */}
        <div className="bg-[var(--color-primary)] rounded-2xl p-8 text-white flex flex-col gap-6">
          <div>
            <span className="text-[var(--color-secondary)] text-sm font-semibold uppercase tracking-wider">
              ¿Emergencia?
            </span>
            <h3 className="text-h3 font-bold mt-1">
              Disponibles 24h, 7 días a la semana
            </h3>
            <p className="text-white/70 mt-2 text-sm">
              Para urgencias, no esperes al formulario.
            </p>
          </div>

          
            <a href="tel:644189289"
            className="flex items-center gap-3 bg-[var(--color-secondary)] text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transition text-lg"
          >
            📞 644 189 289
          </a>

          
            <a href="https://wa.me/34644189289"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition"
          >
            💬 Enviar WhatsApp
          </a>

          <div className="border-t border-white/20 pt-4 text-sm text-white/60">
            <p>⏱ Tiempo de respuesta</p>
            <p className="text-white font-medium mt-1">Urgencias: menos de 30 min</p>
            <p className="text-white font-medium">Presupuestos: menos de 2 horas</p>
          </div>
        </div>

      </div>
    </section>
  )
}