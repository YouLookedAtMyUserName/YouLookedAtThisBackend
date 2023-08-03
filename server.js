const nbx = require("noblox.js")
const koa = require("koa")
const koaRouter = require("@koa/router")
const router = new koaRouter()
const app = new koa()
const cors = require("@koa/cors")

async function GetGameDetails(id) {
  const Data = await nbx.getUniverseInfo([id])
  const SimplifiedData = {playing: Data[0]["playing"], visits: Data[0]["visits"]}
  return SimplifiedData
}

router.get("/Get-Universe-By-Id/:id", async(ctx, next) => {
  ctx.body = await GetGameDetails(ctx.params.id)
  ctx.status = 200
})

app.use(cors()) 
app.use(router.routes())

app.listen(3001)