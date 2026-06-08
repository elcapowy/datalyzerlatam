# Datalyzer Verticales — Deploy a Vercel

Sitio estático. 7 páginas (hub + 6 verticales). Sin build step.

## 🟢 Opción 1 — Drag & Drop (más rápido)

1. https://vercel.com/new
2. Arrastrá esta carpeta entera al área de upload
3. Deploy. URL viva en <1 min.

## 🟡 Opción 2 — GitHub + Vercel (recomendada)

```bash
cd site
git init
git add .
git commit -m "Datalyzer verticales v2"
gh repo create datalyzer-verticales --public --source=. --push
```

Después en Vercel → "Add New Project" → importá el repo → Deploy.

## 🔵 Opción 3 — CLI

```bash
npm i -g vercel
cd site
vercel
```

## Estructura

```
site/
├── index.html              # Hub
├── alimentos.html          # Verde
├── quimicos.html           # Ámbar
├── farmaceutica.html       # Azul
├── aseo.html               # Rosa
├── manufactura.html        # Naranja
├── empaque.html            # Violeta
├── assets/
│   ├── css/                # tokens.css + app.css
│   ├── js/                 # charts, roi, tweaks, main
│   └── img/                # 6 fotos por vertical
├── vercel.json             # Rutas limpias + caché
├── sitemap.xml             # SEO
└── robots.txt
```

## URLs resultantes (con `cleanUrls: true`)

```
/                  → Hub
/alimentos
/quimicos
/farmaceutica
/aseo
/manufactura
/empaque
```

## Dominio custom

En Vercel → Project Settings → Domains → agregás `verticales.datalyzer.com` o el que uses. Apuntás el CNAME en tu DNS.

## Antes de pasar a producción

- [ ] Reemplazar `https://datalyzer-verticales.vercel.app` en `sitemap.xml` por tu dominio real
- [ ] Insertar Calendly real (`<iframe>` dentro de `.calendly-frame` en cada vertical)
- [ ] Logos reales en el marquee de trust
- [ ] (Opcional) Google Analytics — meter el snippet `<script>` en `<head>` o usar Vercel Analytics
