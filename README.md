# Alvaroo.dev — Portfolio

Portfolio comercial estático de Álvaro: servicios, proyectos, proceso de trabajo y contacto. La dirección visual combina fondo crema, azul marino, azul eléctrico, tipografía editorial y composiciones propias para cada proyecto.

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
- `_headers`: cabeceras de seguridad y caché para el despliegue en Cloudflare Workers.
- `robots.txt` y `sitemap.xml`: rastreo e indexación en buscadores.
- `privacidad.html`: información sobre el tratamiento de los datos del formulario.
- `images/`: fotografías, capturas optimizadas en WebP y favicon.
- `fonts/`: tipografías locales y sus licencias OFL.

Los proyectos sin una URL pública facilitada se abren en una ficha con su captura y descripción. El formulario de contacto usa FormSubmit para enviar las consultas a `alvarorema2016@gmail.com`; el primer envío requiere confirmar esa dirección desde el correo recibido. No hay servicios de analítica. Los enlaces a Instagram y a los proyectos solo se abren al pulsarlos.

## Proyectos y material visual

- [Pedrito Barber & Nails](https://pedritobarbershopandnails.es/): fotografías públicas `assets/images/cut-6.jpg` y `assets/images/nail-2.jpg`, presentadas en una composición para el portfolio.
- [Proyecto Humilladero](https://proyectohumilladero.es/): ilustración del monumento publicada en `images/optimized/monumento/diseno_general.jpg`.
- [Ibernovia Atelier](https://ibernovia.es/), Tenis Isturgi, Reaktor Redes, Torneo Pádel y Mantecados Patriarca: capturas conservadas del portfolio original, con versiones WebP para reducir su peso.

Manrope e Instrument Serif se sirven desde el propio proyecto. Las licencias se incluyen en `fonts/`.

## Validación del rediseño

Comprobado con Chromium en anchos de 320, 390, 768, 1024 y 1440 píxeles: sin desbordamiento horizontal, imágenes rotas ni errores de JavaScript. Se comprobaron los enlaces internos, el menú móvil, las cuatro fichas de proyecto, el cierre con Escape, la devolución del foco, las animaciones reducidas y los dos resultados del permiso de portapapeles. Auditoría automática Axe WCAG A/AA sin incidencias en escritorio y móvil; no sustituye una revisión manual completa de accesibilidad.

Los archivos de las pruebas y las capturas locales están en `.preview/`, excluida de Git.

## Publicar en Cloudflare

La carpeta preparada para una subida manual es `release/alvaroo-dev-seo`. En Workers & Pages, crea un nuevo despliegue y sube **el contenido extraído de esa carpeta**, no una carpeta contenedora adicional. `index.html` debe quedar en la raíz del despliegue y `images/` y `fonts/` deben conservarse como carpetas.

Tras publicar, comprueba la portada, una imagen, `privacidad.html`, `sitemap.xml` y el formulario. El primer envío real de FormSubmit manda un correo de activación a `alvarorema2016@gmail.com`; hay que abrirlo y confirmar antes de que lleguen las consultas de clientes.

El sitio incluye metadatos sociales, URL canónica, datos estructurados de negocio local y contenido específico para Andújar, Jaén y Andalucía. Esto facilita la indexación, pero no garantiza una primera posición: la visibilidad también depende de Search Console, la ficha de Google, autoridad, competencia y contenido futuro.
