const Koa = require('koa')
const pageRouter = require('./routers/dev-ssr')
const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(` requset wit path ${ctx.path} `)
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const POST = process.env.PORT || 3333
app.listen(`server is listen on ${HOST}:${POST}`)
