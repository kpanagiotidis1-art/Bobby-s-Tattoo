// Resizes/compresses images in place after they're dropped into these
// folders straight from a camera or phone (often 4000px+ wide, several MB
// each) — run this any time new photos are added (e.g. swapping the
// Instagram grid or hero image), not just once.
import sharp from 'sharp'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const TARGETS = [
  // Hero background — largest thing on the page, but still only ever
  // displayed at viewport width, so no need to keep 4000px+ originals.
  { dir: 'src/assets/hero', maxWidth: 2400, quality: 80 },
  // Instagram grid tiles — small squares, even at 2x retina a 1000px
  // source is more than enough.
  { dir: 'src/assets/instagram', maxWidth: 1000, quality: 78 },
]

for (const { dir, maxWidth, quality } of TARGETS) {
  const files = (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f))

  for (const file of files) {
    const filePath = path.join(dir, file)
    // Read into a buffer rather than handing sharp the path directly — on
    // Windows, sharp/libvips can hold the source file open even after
    // `await` resolves, which then fails the write-back to that same path.
    const original = await readFile(filePath)
    const before = await sharp(original).metadata()

    const buffer = await sharp(original)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer()

    await writeFile(filePath, buffer)

    console.log(
      `${filePath}: ${before.width}x${before.height}, ${(original.length / 1024 / 1024).toFixed(1)}MB -> ` +
        `${(buffer.length / 1024 / 1024).toFixed(2)}MB`,
    )
  }
}
