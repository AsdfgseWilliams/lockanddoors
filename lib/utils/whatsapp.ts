import { TipoBoton, BotonesData } from '@/lib/types/wordpress';

interface OpcionesContacto {
  telefono: string;
  whatsapp: string;
  email: string;
}

/**
 * Resuelve la URL de un botón ACF según su tipo.
 * Devuelve null si el tipo no tiene URL aplicable (ej: Formulario sin enlace).
 */
export function resolveBotonUrl(
  tipo: TipoBoton,
  opciones: OpcionesContacto,
  enlacePersonalizado?: string
): string | null {
  switch (tipo) {
    case 'Teléfono':
      return `tel:${opciones.telefono}`;
    case 'Whatsapp':
      return opciones.whatsapp;
    case 'Email':
      return `mailto:${opciones.email}`;
    case 'Formulario':
      return '#contacto';
    case 'Otro':
      return enlacePersonalizado ?? null;
    default:
      return null;
  }
}

/**
 * Resuelve el texto visible de un botón según su tipo.
 */
export function resolveBotonTexto(
  tipo: TipoBoton,
  textoPersonalizado?: string
): string {
  if (textoPersonalizado) return textoPersonalizado;
  switch (tipo) {
    case 'Teléfono':   return 'Llamar ahora';
    case 'Whatsapp':   return 'WhatsApp';
    case 'Email':      return 'Enviar email';
    case 'Formulario': return 'Solicitar presupuesto';
    case 'Otro':       return '';
    default:           return '';
  }
}