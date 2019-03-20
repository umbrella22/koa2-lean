const router = require('koa-router')()
const get = require("../server/sysstate")
router.prefix('/sys')

router.get("/", (ctx, next) => {
    let data = async () => {
        try {
            let datax = await get
            ctx.body = datax
        } catch (error) {
            console.log(error)
        }
    }
    data()
})







module.exports = router