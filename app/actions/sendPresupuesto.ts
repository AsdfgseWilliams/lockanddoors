'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type FormData = {
  nombre: string
  telefono: string
  email: string
  mensaje: string
  servicio?: string
}

export async function sendPresupuesto(data: FormData) {
  try {
    await resend.emails.send({
      from: 'web@locksanddoors24h.com',   // dominio verificado en Resend
      to: 'locksanddoors24h@gmail.com',
      subject: `Nuevo presupuesto de ${data.nombre}`,
      html: `
        <h2>Nuevo presupuesto desde la web</h2>
        <p><strong>Nombre:</strong> ${data.nombre}</p>
        <p><strong>Teléfono:</strong> ${data.telefono}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.servicio ? `<p><strong>Servicio:</strong> ${data.servicio}</p>` : ''}
        <p><strong>Mensaje:</strong> ${data.mensaje}</p>
      `,
    })
    return { ok: true }
  } catch {
    return { ok: false }
  }
}