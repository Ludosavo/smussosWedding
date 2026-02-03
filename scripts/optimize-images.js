#!/usr/bin/env node

/**
 * Image Optimization Script for Wedding Website
 * 
 * This script optimizes images in the src/components/pictures folder:
 * - Converts images to WebP format (best compression for web)
 * - Creates multiple sizes for responsive images
 * - Preserves original files
 * - Generates an index file for easy imports
 * 
 * Usage:
 *   node scripts/optimize-images.js
 *   npm run optimize-images
 * 
 * Requirements:
 *   npm install sharp --save-dev
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../src/components/icons'),
  outputDir: path.join(__dirname, '../src/components/icons/optimized'),
  sizes: [
    { suffix: 'medium', width: 800, quality: 85 }
  ],
  supportedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG'],
  skipPatterns: ['optimized', 'node_modules']
}

async function loadSharp() {
  try {
    const sharp = await import('sharp')
    return sharp.default
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Sharp is not installed!')
    console.log('\nPlease install sharp first:')
    console.log('\x1b[36m%s\x1b[0m', '  npm install sharp --save-dev\n')
    process.exit(1)
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`📁 Created directory: ${path.relative(process.cwd(), dir)}`)
  }
}

function getImageFiles(dir) {
  const files = fs.readdirSync(dir)
  return files.filter(file => {
    const ext = path.extname(file)
    const shouldSkip = CONFIG.skipPatterns.some(pattern => file.includes(pattern))
    return CONFIG.supportedFormats.includes(ext) && !shouldSkip
  })
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

async function optimizeImage(sharp, inputPath, outputDir, filename) {
  const baseName = path.parse(filename).name.replace(/\s+/g, '-')
  const originalSize = fs.statSync(inputPath).size
  const results = []
  
  console.log(`\n🖼️  Processing: ${filename}`)
  console.log(`   Original size: ${formatBytes(originalSize)}`)
  
  for (const size of CONFIG.sizes) {
    const outputFilename = `${baseName}-${size.suffix}.webp`
    const outputPath = path.join(outputDir, outputFilename)
    
    try {
      const image = sharp(inputPath)
      const metadata = await image.metadata()
      
      // Only resize if image is larger than target
      const shouldResize = metadata.width > size.width
      
      let pipeline = image
      
      if (shouldResize) {
        pipeline = pipeline.resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
      }
      
      await pipeline
        .webp({ quality: size.quality })
        .toFile(outputPath)
      
      const newSize = fs.statSync(outputPath).size
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1)
      
      results.push({
        size: size.suffix,
        filename: outputFilename,
        bytes: newSize,
        savings: `${savings}%`
      })
      
      console.log(`   ✅ ${size.suffix}: ${formatBytes(newSize)} (${savings}% smaller)`)
    } catch (error) {
      console.error(`   ❌ Failed to create ${size.suffix}: ${error.message}`)
    }
  }
  
  return {
    original: filename,
    baseName,
    results
  }
}

function generateImportsFile(processedImages, outputDir) {
  const imports = []
  const entries = []
  const usedKeys = new Set()
  const usedImports = new Set()

  function normalizeKey(name) {
    return name
      .replace(/-medium$/i, '')
      .replace(/\s+/g, '-')        // spaces -> hyphen
      .replace(/_+/g, '-')         // underscores -> hyphen
      .replace(/-+/g, '-')         // collapse multiple hyphens
      .replace(/[^a-zA-Z0-9-]/g, '-') // strip odd chars
      .replace(/^-+|-+$/g, '')     // trim hyphens
  }

  function importIdFromKey(base, fallbackIndex) {
    const candidate = base.replace(/[^a-zA-Z0-9]/g, '_') || `img_${fallbackIndex}`
    if (!usedImports.has(candidate)) return candidate
    let i = 1
    while (usedImports.has(`${candidate}_${i}`)) i++
    return `${candidate}_${i}`
  }

  processedImages.forEach((img, idx) => {
    const key = normalizeKey(img.baseName)
    if (!key || usedKeys.has(key)) return

    const importName = importIdFromKey(key, idx)
    usedImports.add(importName)
    usedKeys.add(key)

    const filename = `${img.baseName}-medium.webp`
    imports.push(`import ${importName} from './optimized/${filename}'`)
    entries.push(
      `  "${key}": { medium: ${importName}, thumb: ${importName}, small: ${importName}, large: ${importName}, full: ${importName} }`
    )
  })

  const content = `// Auto-generated by optimize-images.js
// Run 'npm run optimize-images' to regenerate

${imports.join('\n')}

export const imagesMap = {
${entries.join(',\n')}
}

export function getSrcSet(imageObj) {
  return \`\${imageObj.medium} 800w\`
}

export function getSizes(defaultSize = '100vw') {
  return \`(max-width: 768px) 100vw, \${defaultSize}\`
}
`

  const indexPath = path.join(CONFIG.inputDir, 'optimized-images.js')
  fs.writeFileSync(indexPath, content)
  console.log(`\n📝 Generated imports file: src/components/icons/optimized-images.js`)
}

async function main() {
  console.log('\n🚀 Image Optimization Script')
  console.log('━'.repeat(50))
  
  const sharp = await loadSharp()
  
  // Ensure output directory exists
  ensureDir(CONFIG.outputDir)
  
  // Get all images
  const images = getImageFiles(CONFIG.inputDir)
  
  if (images.length === 0) {
    console.log('⚠️  No images found to optimize.')
    return
  }
  
  console.log(`\n📷 Found ${images.length} images to optimize`)
  
  const processedImages = []
  let totalOriginalSize = 0
  let totalOptimizedSize = 0
  
  for (const image of images) {
    const inputPath = path.join(CONFIG.inputDir, image)
    const result = await optimizeImage(sharp, inputPath, CONFIG.outputDir, image)
    processedImages.push(result)
    
    totalOriginalSize += fs.statSync(inputPath).size
    result.results.forEach(r => {
      if (r.size === 'medium') {
        totalOptimizedSize += r.bytes
      }
    })
  }
  
  // Generate imports file
  generateImportsFile(processedImages, CONFIG.outputDir)
  
  // Summary
  console.log('\n' + '━'.repeat(50))
  console.log('📊 Summary')
  console.log('━'.repeat(50))
  console.log(`   Images processed: ${images.length}`)
  console.log(`   Original total: ${formatBytes(totalOriginalSize)}`)
  console.log(`   Optimized (medium): ${formatBytes(totalOptimizedSize)}`)
  console.log(`   Total savings: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`)
  console.log('\n✨ Optimization complete!\n')
  
  console.log('💡 Usage in Vue components:')
  console.log('━'.repeat(50))
  console.log(`
  import { zanzi, getSrcSet, getSizes } from '@/components/pictures/optimized-images'
  
  // In template:
  <img 
    :src="zanzi.medium" 
    :srcset="getSrcSet(zanzi)"
    :sizes="getSizes('33vw')"
    alt="Zanzibar"
    loading="lazy"
  />
  `)
}

main().catch(console.error)
