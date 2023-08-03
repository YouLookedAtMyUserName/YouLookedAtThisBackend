const nbx = require("noblox.js")
const koa = require("koa")
const koaRouter = require("@koa/router")
const router = new koaRouter()
const app = new koa()
const cors = require("@koa/cors")

async function getUsername(id) {
    const Username = await nbx.getUsernameFromId(id)
    console.log(Username)
    return Username
}

async function GetGameDetails(id) {
  const Data = await nbx.getUniverseInfo([id])
  const SimplifiedData = {playing: Data[0]["playing"], visits: Data[0]["visits"]}
  return SimplifiedData
}

// app.use(async ctx => {
//   ctx.body = await getUsername(1982544795)
// })

router.get("/Get-User-By-Id/:id", async(ctx, next) => {
  ctx.body = await getUsername(ctx.params.id)
  ctx.status = 200
})

router.get("/Get-Universe-By-Id/:id", async(ctx, next) => {
  ctx.body = await GetGameDetails(ctx.params.id)
  ctx.status = 200
})

app.use(cors())
app.use(router.routes())

app.listen(3001)