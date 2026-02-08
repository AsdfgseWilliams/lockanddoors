// types/wordpress.ts (VERSIÓN CORREGIDA)
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
  textoBoton1?: string;
  enlaceBoton1?: string;
  textoBoton2?: string;
  enlaceBoton2?: string;
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

// Las relaciones también vienen envueltas en nodes
export interface ZonaNode {
  node: {
    id: string;
    title: string;
    slug: string;
  };
}

export interface ZonasCobertura {
  nodes: ZonaNode[];
}

export interface HomeACF {
  hero: HeroData;
  servicios: ServiciosData;
  testimonios: TestimoniosData;
  faq: FAQData;
  zonasDeCobertura: ZonasCobertura;
}

export interface PageData {
  page: {
    title: string;
    home: HomeACF;
  };
}