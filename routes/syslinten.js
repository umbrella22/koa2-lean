const router = require('koa-router')()
const get = require("../server/sysstate")
router.prefix('/sys')

router.get("/", async (ctx, next) => {
    let data = await get()
    ctx.body = data
})







module.exports = router