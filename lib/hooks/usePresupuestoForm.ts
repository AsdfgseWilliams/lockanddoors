'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendPresupuesto, type FormData } from '@/app/actions/sendPresupuesto'

export function usePresupuestoForm(servicio?: string) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  const form = useForm<FormData>({
    defaultValues: { nombre: '', telefono: '', email: '', mensaje: '', servicio }
  })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    const result = await sendPresupuesto({ ...data, servicio })
    setStatus(result.ok ? 'ok' : 'error')
    if (result.ok) form.reset()
  }

  return { form, status, onSubmit: form.handleSubmit(onSubmit) }
}