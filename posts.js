// posts.js — Lista de posts del blog
// Para agregar un nuevo post:
//   1. Copia un objeto del array de abajo
//   2. Pégalo al INICIO del array (el más reciente va primero)
//   3. Llena los campos
//   4. Crea blog/tu-slug.html copiando blog/plantilla.html

var BLOG_POSTS = [
  {
    slug:     'vehicular-wrap-vs-pintura',
    title:    '¿Wrap vehicular o pintura? Ventajas y costos en México',
    date:     '2026-03-27',
    category: 'Rotulación',
    excerpt:  'Comparamos ambas opciones para que elijas lo mejor para tu flota o auto personal. Costos, durabilidad y tiempos de instalación.',
    image:    'assets/blog/vehicular-wrap-vs-pintura.webp',
    imageAlt: 'Automóvil con wrap de vinil vs pintura tradicional',
  },
];
