# MixAssist - página de descargas

Página pública de MixAssist. Presenta el producto y permite descargar el VST3, el Companion y los manuales para Windows, Linux y macOS.

El código fuente del VST y de los Companion se mantiene en un repositorio privado. Este repositorio contiene únicamente la página estática y los enlaces públicos de descarga.

## Estructura

- `index.html`: estructura, contenido y enlaces de la página.
- `styles.css`: diseño visual responsive.
- `script.js`: menú móvil, animaciones, año del pie de página y detección automática del sistema operativo.
- `assets/`: iconos, logotipos e imágenes utilizadas por la página.

## Descargas

Los instaladores y manuales se publican como assets de una Release del repositorio público de descargas:

- Windows: instalador principal y versión Universal.
- Linux: VST3, Companion Flatpak y Companion AppImage.
- macOS: instalador Intel (`x64`) y Apple Silicon (`arm64`).
- Manuales de Windows, Linux y macOS.

Cuando se publique una nueva versión, hay que actualizar en `index.html` el tag de la Release y, si cambia, los nombres de los archivos enlazados.

## Recomendación automática

La página detecta el sistema operativo del visitante y marca como recomendada la tarjeta correspondiente:

- Windows → Windows.
- macOS → macOS.
- Linux → Linux.
- Sistema no identificado → Windows como opción predeterminada.

## Donaciones

La sección de apoyo enlaza a:

- Mercado Pago: https://link.mercadopago.com.ar/maritoov
- PayPal: https://www.paypal.me/MusicGM
