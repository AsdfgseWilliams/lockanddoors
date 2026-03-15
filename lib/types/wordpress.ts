// types/wordpress.ts
// Tipos compartidos para los datos de WordPress ACF con WPGraphQL

// Las imágenes en ACF GraphQL vienen envueltas en un objeto "node"
export interface MediaItem {
  node: {
    sourceUrl: string;
    altText: string;
    mediaItemUrl?: string;
    id?: string;
  };
}

export interface HeroData {
  titulo: string;
  subtitulo: string;
  fondo: MediaItem;
  botonesHero?: {
    boton_1: TipoBoton;
    textoBoton1?: string;
    enlaceBoton1?: string;
    boton2: TipoBoton;
    textoBoton2?: string;
    enlaceBoton2?: string;
  };
}

export interface Servicio {
  titulo: string;
  descripcion: string;
  icono: MediaItem;
}

export interface ServiciosData {
  titulo: string;
  subtitulo: string;
  servicio1: Servicio;
  servicio2: Servicio;
  servicio3: Servicio;
  servicio4: Servicio;
  servicio5: Servicio;
}

export interface Testimonio {
  nombre: string;
  comentario: string;
  foto: MediaItem;
}

export interface TestimoniosData {
  titulo: string;
  testimonio1: Testimonio;
  testimonio2: Testimonio;
  testimonio3: Testimonio;
}

export interface FAQData {
  titulo: string;
  pregunta1: string;
  respuesta1: string;
  pregunta2: string;
  respuesta2: string;
  pregunta3: string;
  respuesta3: string;
  pregunta4: string;
  respuesta4: string;
  pregunta5: string;
  respuesta5: string;
  pregunta6: string;
  respuesta6: string;
}

export interface FAQItem {
  pregunta: string;
  respuesta: string;
}


export interface ZonasCobertura {
  nodes: ZonaNode[];
}

export interface DestacadosData {
  nodes: Array<{ slug: string; title: string; excerpt: string }>;
}

export interface ContenidoData {
  titulo: string;
  subtitulo: string;
  textoBoton1?: string;
  enlaceBoton1?: string;
  textoBoton2?: string;
  enlaceBoton2?: string;
}

export interface UrgenciasData {
  titulo: string;
  subtitulo: string;
  boton_1: TipoBoton | TipoBoton[];
  textoBoton1?: string;
  enlaceBoton1?: string;
  boton2: TipoBoton | TipoBoton[];
  textoBoton2?: string;
  enlaceBoton2?: string;
}


export interface HomeACF {
  hero: HeroData;
  destacados: DestacadosData;
  contenido: ContenidoData;
  urgencias: UrgenciasData;
  titulo?: string;
  subtitulo?: string;
  ctaTitulo?: string;   
  ctaSubtitulo?: string;
  zonasDeCobertura?: ZonasDeCobertura;
  botonesZonas?: BotonesData;
}

export interface PageData {
  page: {
    title: string;
    home: HomeACF;
  };
}

// Botones con selector tipo (Teléfono | Whatsapp | Email | Formulario | Otro)
export type TipoBoton = 'Teléfono' | 'Whatsapp' | 'Email' | 'Formulario' | 'Otro';

export interface BotonesData {
  boton_1: TipoBoton | TipoBoton[];
  textoBoton1?: string;
  enlaceBoton1?: string;
  boton2: TipoBoton | TipoBoton[];
  textoBoton2?: string;
  enlaceBoton2?: string;
}

// Zona de cobertura (relationship post tipo ubicacion)
export interface ZonaNode {
  id: string;
  title: string;
  slug: string;
}

export interface ZonasDeCobertura {
  nodes: ZonaNode[];
}

// Sección zonas en HomeACF
export interface ZonasCoberturaACF {
  titulo: string;
  subtitulo: string;
  zonasDeCobertura: ZonasDeCobertura;
  botonesZonas: BotonesData;
}

export interface OpcionesData {
  telefono: string;
  whatsapp: string;
  email: string;
}

export interface HomePageData {
  page: { translation: { home: HomeACF } };
  opciones: { paGinaDeOpciones: OpcionesData };
}