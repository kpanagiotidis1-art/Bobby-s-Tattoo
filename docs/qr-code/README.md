# Consent form QR code

Encodes `https://bobbystattoo.com/consent` — the hidden consent form, not linked in site navigation.

- `consent-form-qr.svg` — vector, best for print (scales to any size with no quality loss)
- `consent-form-qr.png` — 1000×1000px raster, fine for digital use or smaller prints

Generated with the `qrcode` npm package, error correction level H (high) — the QR code stays scannable even if part of it is scuffed, covered, or printed small, which matters for a physical card/sign in a studio.

**This won't scan successfully yet** — `bobbystattoo.com` isn't deployed or pointed anywhere. Regenerate (or just wait — the URL it encodes doesn't change) once the site is live in production. If the domain or the `/consent` path ever changes, this needs regenerating:

```
npx qrcode -t svg -e H -o docs/qr-code/consent-form-qr.svg "https://bobbystattoo.com/consent"
npx qrcode -t png -e H -w 1000 -o docs/qr-code/consent-form-qr.png "https://bobbystattoo.com/consent"
```
