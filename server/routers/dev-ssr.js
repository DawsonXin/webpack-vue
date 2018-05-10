const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')
const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server-render')
const serverComplier = webpack(serverConfig)
const mfs = new MemoryFS()
serverComplier.outputFilesSystem = mfs

let bundle
serverComplier.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readdirSync(bundlePath, 'utf-8'))
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等一会，别着急。。。'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs')
  )
  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(ctx, renderer, template)
}
const router = new Router()
router.get('*', handleSSR)
module.exports = router
