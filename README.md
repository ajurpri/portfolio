# Alvaroo.dev — Portfolio

Portfolio estático de Álvaro, con una dirección visual basada en la referencia: fondo crema, azul marino, azul eléctrico y tipografía en negrita.

## Abrir en local

Se puede abrir `index.html` directamente. Para disponer de una vista previa con un origen local y acceso al portapapeles:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Abrir http://127.0.0.1:4173. No necesita instalación de dependencias ni compilación.

## Editar

- `index.html`: contenido, enlaces, portadas y datos de contacto.
- `style.css`: tipografía, colores y diseño adaptable.
- `app.js`: menú móvil, detalles de proyectos y copia del correo.
- `images/`: fotografías, capturas optimizadas en WebP y favicon.
- `fonts/`: tipografías locales y sus licencias OFL.

Los proyectos sin una URL pública facilitada se abren en una ficha con su captura y descripción. No hay formularios que envíen datos ni servicios de analítica. Los enlaces a Instagram y a los proyectos solo se abren al pulsarlos.

## Proyectos y material visual

- [Pedrito Barber & Nails](https://pedritobarbershopandnails.es/): fotografías públicas `assets/images/cut-6.jpg` y `assets/images/nail-2.jpg`, presentadas en una composición para el portfolio.
- [Proyecto Humilladero](https://proyectohumilladero.es/): ilustración del monumento publicada en `images/optimized/monumento/diseno_general.jpg`.
- [Ibernovia Atelier](https://ibernovia.es/), Tenis Isturgi, Reaktor Redes, Torneo Pádel y Mantecados Patriarca: capturas conservadas del portfolio original, con versiones WebP para reducir su peso.

Manrope e Instrument Serif se sirven desde el propio proyecto. Las licencias se incluyen en `fonts/`.

## Validación del rediseño

Comprobado con Chromium en anchos de 320, 390, 768, 1024 y 1440 píxeles: sin desbordamiento horizontal, imágenes rotas ni errores de JavaScript. Se comprobaron los enlaces internos, el menú móvil, las cuatro fichas de proyecto, el cierre con Escape, la devolución del foco y los dos resultados del permiso de portapapeles. Auditoría automática Axe WCAG A/AA sin incidencias en escritorio y móvil; no sustituye una revisión manual completa de accesibilidad.

Los archivos de las pruebas y las capturas locales están en `.preview/`, excluida de Git.
