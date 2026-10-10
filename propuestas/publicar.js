// Copia una propuesta interactiva desde Dropbox a la web, agregando las etiquetas
// para que no aparezca en Google, para la vista previa en WhatsApp y la medición
// de visitas con Microsoft Clarity (proyecto "Propuestas Lucía Da Silva").
// Uso: node propuestas/publicar.js "<carpeta de la propuesta en Dropbox>" <slug> "<titulo para WhatsApp>"
const fs = require('fs');
const path = require('path');

const [src, slug, title] = process.argv.slice(2);
if (!src || !slug || !title) {
  console.error('Uso: node propuestas/publicar.js "<carpeta>" <slug> "<titulo>"');
  process.exit(1);
}
const dest = path.join(__dirname, slug);
const url = `https://luciadasilvaestudio.com.ar/propuestas/${slug}/`;

fs.mkdirSync(path.join(dest, 'img'), { recursive: true });
for (const f of fs.readdirSync(path.join(src, 'img'))) {
  fs.copyFileSync(path.join(src, 'img', f), path.join(dest, 'img', f));
}

let html = fs.readFileSync(path.join(src, 'presentacion-interactiva.html'), 'utf8');
const anchor = '<meta name="viewport" content="width=device-width, initial-scale=1">';
if (!html.includes(anchor)) throw new Error('No encontré la etiqueta viewport');
html = html.replace(anchor, `${anchor}
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="${title} · Lucía Da Silva Estudio">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="Arq. Clara Tacco Carulli &amp; D.I. Lucía Da Silva · Lucía Da Silva Estudio">
<meta property="og:image" content="${url}img/gracias.jpg">
<meta property="og:url" content="${url}">
<link rel="icon" type="image/png" href="/assets/images/favicon.png">
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "yv9lywlscl");
  clarity("set", "propuesta", "${slug}");
  // link personalizado (?c=codigo o ?de=nombre) para saber quién la miró
  (function(){ var q = new URLSearchParams(location.search), v = q.get("c") || q.get("de"); if (v) clarity("set", "visitante", v.toLowerCase()); })();
</script>`);
fs.writeFileSync(path.join(dest, 'index.html'), html);
console.log('Publicada en', url);
