import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const mediaDir = path.resolve('public/media')

const jobs = [
  { input: 'rice-terrace-source.jpg', output: 'rice-terrace.webp', width: 1800, quality: 72 },
  { input: 'busana-sunda-source.jpg', output: 'busana-sunda.webp', width: 1600, quality: 72 },
  { input: 'terrace-mist-source.jpg', output: 'terrace-mist.webp', width: 1600, quality: 70 },
  { input: 'village-aerial-source.jpg', output: 'village-aerial.webp', width: 1600, quality: 68 },
  { input: 'village-night-source.jpg', output: 'village-night.webp', width: 1600, quality: 68 },
  { input: 'rumah-baduy-source.jpg', output: 'rumah-baduy.webp', width: 2200, quality: 70 },
  { input: 'angklung-source.jpg', output: 'angklung.webp', width: 1400, quality: 72 },
]

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

for (const job of jobs) {
  const inputPath = path.join(mediaDir, job.input)
  const outputPath = path.join(mediaDir, job.output)

  if (!(await fileExists(inputPath))) {
    continue
  }

  await sharp(inputPath)
    .rotate()
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 6 })
    .toFile(outputPath)
}

const report = await Promise.all(
  jobs.map(async (job) => {
    const outputPath = path.join(mediaDir, job.output)

    if (!(await fileExists(outputPath))) {
      return null
    }

    const stat = await fs.stat(outputPath)
    return `${job.output}: ${Math.round(stat.size / 1024)} KB`
  }),
)

console.log(report.filter(Boolean).join('\n'))
