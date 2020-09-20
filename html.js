require('make-promises-safe')

const { minify } = require('terser')

async function main() {
  const result = await minify(
    require('fs').readFileSync(
      'dist/dtinthblurhashimage.umd.production.min.js',
      'utf8'
    ),
    { format: { semicolons: false } }
  )
  const header = [
    require('./package.json').name,
    require('./package.json').version,
  ].join('@')
  console.log(`<script>/* ${header} */${result.code}</script>`)
}

main()
