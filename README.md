# WebsiteSoft website

Static website (HTML, CSS, JavaScript) with a Three.js 3D scene. No build step.

## Structure

```
index.html              Home page: markup, meta tags, structured data
services/, about/, ...  One pre-rendered index.html per page (generated, see below)
404.html                Fallback for unknown addresses (routes old links)
assets/css/styles.css   All styles
assets/js/main.js       Interactions, page content and routing, 3D scene
sitemap.xml, robots.txt, llms.txt   Search engine and AI assistant files
assets/vendor/three.min.js   Three.js r128 (bundled, no CDN needed)
assets/img/             Photos (Unsplash) and favicon
```

Every page has its own real address, for example `/services/umbraco/umbraco-upgrades/`. Each address has a pre-rendered `index.html` with its own title, description, canonical link and structured data, so search engines and AI assistants can read every page without running JavaScript. Once loaded, the site switches pages instantly in the browser.

Old `#/` links (for example `/#/services/umbraco`) redirect to the new addresses automatically.

The site must be served from the root of the domain (`https://www.websitesoft.co.uk/`). If it is ever hosted in a subfolder, change `<base href="/">` in every HTML file to that folder.

The page folders are generated from the page content in `assets/js/main.js`. When content changes, regenerate them so the pre-rendered HTML stays in step.

## Run locally

Use a local web server (opening the file directly also works, but a server is closer to production).

Option 1, Node.js:

```bash
npm start
```

Then open http://localhost:8080

Option 2, Python:

```bash
python -m http.server 8080
```

Then open http://localhost:8080

## Push to an existing GitHub repository

Copy these files into your repository folder, then:

```bash
git add .
git commit -m "Add WebsiteSoft website"
git push
```

## Deploy

This folder is published to https://www.websitesoft.co.uk/ through the public repository `websitesoftware/site` (GitHub Pages, `main` branch, root folder, `CNAME` = www.websitesoft.co.uk). Do not edit that repository by hand: from `concepts/blue` in the `www` repository run `python tools/build.py`, commit, then `python tools/deploy.py`. Procedure, smoke test, DNS and rollback: `docs/LIVE-SITE.md` in the `www` repository.

Any other static host also works (Netlify, Cloudflare Pages, Azure Static Web Apps, IIS); the matching header files are included (`_headers`, `staticwebapp.config.json`, `web.config`).

## Notes

- Fonts load from Google Fonts. Everything else is local.
- The contact forms send through FormSubmit (see Contact forms below); the first live submission needs a one-time activation.
- Update the canonical and Open Graph URLs in `index.html` if the domain changes.
- Photos are free Unsplash images; replace them with real team photos when available (same file names in `assets/img/`).

## Contact forms

The Let's talk page (`/contact/`) and every enquiry page (`/enquire/...`) send to **enquiries@websitesoft.co.uk**. When the Cloudflare Worker in `workers/enquiry` is deployed (it answers `/api/health`), forms post to `/api/enquiry`, which runs a Cloudflare Turnstile check in managed mode (a challenge only for suspicious traffic), filters automated junk and relays through [FormSubmit](https://formsubmit.co). Without the Worker, forms post to FormSubmit directly (free, no server needed). The subject is filled in automatically from the page the visitor came from.

One-time setup:

1. Deploy the site, then send one test enquiry from the live site.
2. FormSubmit emails an **activation link** to enquiries@websitesoft.co.uk. Click it.
3. From then on, every submission arrives in that inbox as an email (the visitor's address is set as Reply-To).

Optional: after activation, FormSubmit shows a random alias for the address. Replace `ENQ_TO` in `assets/js/main.js` with that alias to keep the real address out of the page source.

If sending fails (offline, or a blocked network), the form shows the visitor a "Copy my enquiry" button and the email address instead.

## Security

- `index.html` carries a Content Security Policy that only allows this site, Google Fonts and FormSubmit.
- Security headers (HSTS, CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) are ready for each host:
  - Netlify or Cloudflare Pages: `_headers`
  - Azure Static Web Apps: `staticwebapp.config.json`
  - IIS or Azure App Service: `web.config`
  - GitHub Pages cannot set headers; the CSP in `index.html` still applies.
- `.well-known/security.txt` tells researchers how to report a vulnerability. Update its `Expires` date every year.
- `robots.txt` and `sitemap.xml` are included.
- Legal pages: `/privacy/` (Privacy Statement, including data security and cookies) and `/terms/` (Terms of Use).

## SEO and AI search (GEO)

- Each page has a unique title, meta description, canonical URL, Open Graph and Twitter tags.
- Structured data (schema.org JSON-LD): Organization and WebSite on every page; Service and BreadcrumbList on service pages; FAQPage on the home page; WebPage everywhere.
- Enquiry form pages are `noindex` so they do not compete with the service pages.
- `sitemap.xml` lists every indexable page. Submit it in Google Search Console and Bing Webmaster Tools.
- `robots.txt` explicitly allows search engines and AI assistants (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended and others).
- `llms.txt` gives AI assistants a plain summary of WebsiteSoft and links to every service page.
- All images have descriptive alt text.
