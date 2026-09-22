# LinkClean Shelf

A browser-only UtilityShelf micro utility for cleaning tracking parameters from copied links.

## MVP Features

- Cleans one or more links from pasted text.
- Removes common tracking parameters such as UTM tags, fbclid, gclid, msclkid, and newsletter IDs.
- Optionally sorts remaining query parameters.
- Keeps useful non-tracking parameters.
- Runs locally in the browser.

## Publishing

Recommended public URL:

```text
https://linkclean.utilityshelf.site/
```

Use Cloudflare Pages with:

```text
Framework preset: None
Build command:
Build output directory: /
```

See `PUBLISHING.md` for the deployment checklist.
