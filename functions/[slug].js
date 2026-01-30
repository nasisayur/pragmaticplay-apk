export async function onRequest({ params }) {
  const slug = params.slug || 'apk';
  const clean = slug.replace(/-apk$/,'').replace(/-/g,' ');
  const NAME  = clean.replace(/\b\w/g, c => c.toUpperCase());
  const TITLE = `${NAME} APK Download Versi Terbaru Android`;

  /* ===== DATA POOL ===== */
  const versions = [
    '10.1.0','10.2.1','10.3.2','10.4.0','10.5.3',
    '11.0.1','11.1.0','11.2.4','11.3.1','11.4.2','11.5.0',
    '12.0.1','12.1.3','12.2.0','12.3.2','12.4.1','12.5.0',
    '13.0.2','13.1.1','13.2.0','13.3.4','13.4.2','13.5.1',
    '14.0.0','14.1.2','14.2.1','14.3.0','14.4.3',
    '15.0.1','15.1.0','15.2.4','15.3.2'
  ];

  const sizes = [
    '14MB','15MB','16MB','17MB','18MB','19MB',
    '20MB','21MB','22MB','23MB','24MB','25MB'
  ];

  const descPool = [
    'ringan dan cepat digunakan',
    'tanpa lag di semua perangkat',
    'aman dan stabil untuk Android',
    'kompatibel semua versi Android',
    'desain modern dan user friendly'
  ];

  function pick(seed, arr){
    let h = 0;
    for (let i=0;i<seed.length;i++) {
      h = (h<<5) - h + seed.charCodeAt(i);
    }
    return arr[Math.abs(h) % arr.length];
  }

  const version = pick(slug, versions);
  const size    = pick(slug, sizes);
  const desc    = pick(slug, descPool);

  /* ===== SCHEMA ===== */
  const schema = {
    "@context":"https://schema.org",
    "@type":"SoftwareApplication",
    "name":`${NAME} APK`,
    "operatingSystem":"Android",
    "applicationCategory":"GameApplication",
    "softwareVersion":version,
    "offers":{
      "@type":"Offer",
      "price":"0",
      "priceCurrency":"USD"
    }
  };

  /* ===== HTML AMP ===== */
  const html = `<!doctype html>
<html ⚡ lang="id">
<head>
<meta charset="utf-8">
<title>${TITLE}</title>

<link rel="canonical" href="https://pragmaticplay.co.in/apk/${slug}/">
<meta name="viewport" content="width=device-width,minimum-scale=1">

<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-img"
  src="https://cdn.ampproject.org/v0/amp-img-0.1.js"></script>

<style amp-boilerplate>
body{visibility:hidden}
</style>
<noscript>
<style amp-boilerplate>
body{visibility:visible}
</style>
</noscript>

<script type="application/ld+json">
${JSON.stringify(schema)}
</script>

<style amp-custom>
body{
  font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;
  padding:16px;
  line-height:1.6;
  background:#0b0b0b;
  color:#fff;
}
h1{font-size:22px;margin:12px 0}
.meta{font-size:14px;opacity:.8;margin-bottom:12px}
.card{
  background:#151515;
  border-radius:14px;
  padding:14px;
  margin-bottom:16px;
}
.btn{
  display:block;
  background:#0a58ca;
  color:#fff;
  text-align:center;
  padding:14px;
  border-radius:12px;
  font-weight:700;
  text-decoration:none;
  margin:16px 0;
}
ul{padding-left:18px}
li{margin-bottom:6px}
</style>
</head>

<body>

<amp-img
  src="https://i.postimg.cc/v8JR9HWv/Gambar_ikon_aplikasi_777.png"
  width="600"
  height="600"
  layout="responsive"
  alt="${NAME} APK Android">
</amp-img>

<h1>${NAME} APK</h1>
<div class="meta">Versi ${version} · ${size} · Android</div>

<div class="card">
<p>
${NAME} APK versi terbaru merupakan aplikasi Android yang ${desc}.
Aplikasi ini mendukung berbagai perangkat dan memberikan pengalaman
pengguna yang stabil serta cepat.
</p>
</div>

<div class="card">
<h3>📌 Informasi Aplikasi</h3>
<ul>
  <li>Nama: ${NAME} APK</li>
  <li>Versi: ${version}</li>
  <li>Ukuran: ${size}</li>
  <li>OS: Android</li>
  <li>Status: Gratis</li>
</ul>
</div>

<a class="btn" href="https://pragmaticplay.co.in/">
DOWNLOAD APK
</a>

<div class="card">
<p>
Download ${NAME} APK hari ini dan nikmati aplikasi Android versi terbaru
yang aman, ringan, dan kompatibel dengan semua device.
</p>
</div>

</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "public, max-age=1800"
    }
  });
}
