I made the 404.html file a copy of index.html - that way if I ever refresh on a page, the server will still server content instead of displaying a not found page.

For "real" 404s that don't match my client-side routing, I have a "NotFound" route.

Downside: there are good pages with status 404, and the bad pages are probably returning 200s
