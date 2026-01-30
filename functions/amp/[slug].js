export async function onRequest({ params }) {
  const slug = params.slug;
  const name = slug.replace(/-apk$/,'').replace(/-/g,' ');
  const TITLE = `${name.toUpperCase()} APK Download Versi Terbaru`;

  const versions = [
    '10.1.0','10.2.1','10.3.2','10.4.0','10.5.3',
    '11.0.1','11.1.0','11.2.4','11.3.1','11.4.2','11.5.0',
    '12.0.1','12.1.3','12.2.0','12.3.2','12.4.1','12.5.0',
    '13.0.2','13.1.1','13.2.0','13.3.4','13.4.2','13.5.1',
    '14.0.0','14.1.2','14.2.1','14.3.0','14.4.3',
    '15.0.1','15.1.0','15.2.4','15.3.2'
  ];

  const sizes = [
    '14MB','15MB','16MB','17MB','18MB',
    '19MB','20MB','21MB','22MB','23MB',
    '24MB','25MB','26MB','27MB'
  ];

  function pick(slug, arr){
    let h = 0;
    for (let i=0;i<slug.length;i++) {
      h = (h << 5) - h + slug.charCodeAt(i);
    }
    return arr[Math.abs(h) % arr.length];
  }

  const version = pick(slug, versions);
  const size    = pick(slug, sizes);

  const entitiesPool = [
    'SLOT GACOR 777','PRIMA777','SLOT777','SLOT88','GAME ANDROID'
  ];
  const entities = entitiesPool
    .slice(0, (Math.abs(slug.length) % 3) + 2)
    .join(' · ');

  const schema = {
    "@context":"https://schema.org",
    "@type":"SoftwareApplication",
    "name": `${name} APK`,
    "operatingSystem":"Android",
    "applicationCategory":"GameApplication",
    "softwareVersion": version,
    "offers":{
      "@type":"Offer",
      "price":"0",
      "priceCurrency":"USD"
    }
  };

  const html = `<!doctype html>
<html ⚡ lang="id">
<head>
<meta charset="utf-8">
<title>${TITLE}</title>

<link rel="canonical" href="https://pragmaticplay.co.in/apk/${slug}/">
<meta name="viewport" content="width=device-width,minimum-scale=1">

<script async src="https://cdn.ampproject.org/v0.js"></script>

<style amp-boilerplate>
body{visibility:hidden}
</style>
<noscript>
<style amp-boilerplate>
body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
animation:-amp-start 8s steps(1,end) 0s 1 normal both}
@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
</style>
</noscript>

<script type="application/ld+json">
${JSON.stringify(schema)}
</script>
<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-img"
  src="https://cdn.ampproject.org/v0/amp-img-0.1.js"></script>

<style amp-custom>
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;padding:16px;line-height:1.6}
h1{font-size:22px;margin:0 0 8px}
p{margin:0 0 12px}
.meta{font-size:14px;opacity:.9}
a.btn{display:inline-block;background:#0a58ca;color:#fff;
padding:12px 16px;border-radius:10px;text-decoration:none;font-weight:700}
.links{margin-top:14px;font-size:14px}
</style>
</head>

<body>

<amp-img
  src="https://i.postimg.cc/v8JR9HWv/Gambar_ikon_aplikasi_777.png"
  width="600"
  height="600"
  layout="responsive"
  alt="${name} APK Android">
</amp-img>

<h1>${name.toUpperCase()} APK</h1>
<p class="meta">Versi ${version} · ${size} · Android</p>

<p>
Download ${name} APK versi terbaru login gratis Android.
Cepat, stabil, dan kompatibel semua perangkat.
</p>

<a class="btn" href="https://pragmaticplay.co.in/">DOWNLOAD APK</a>

<div class="links">${entities}</div>

</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "public, max-age=600"
    }
  });
}
