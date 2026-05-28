# Publishing LinkClean Shelf

Recommended Cloudflare Pages settings:

- Repository: `mrculture/linkclean-shelf`
- Project name: `linkclean-shelf`
- Production branch: `main`
- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`

After deployment:

1. Confirm the homepage loads over HTTPS.
2. Confirm `robots.txt` and `sitemap.xml` return HTTP 200.
3. Submit `https://linkclean-shelf.pages.dev/sitemap.xml` in Google Search Console.
4. Add Cloudflare Web Analytics from the Cloudflare dashboard if desired.
