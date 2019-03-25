const router = require('koa-router')()

const get = require('../server/socket')

router.prefix('/sys')

router.get("/", async (ctx, next) => {
    await get()
     ctx.body = "启动socket服务"

})






module.exports = router