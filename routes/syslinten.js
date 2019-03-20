const router = require('koa-router')()
const get = require("../server/sysstate")
router.prefix('/sys')

router.get("/", (ctx, next) => {
    ctx.body = get
})







module.exports = router