const router = require('koa-router')()
const get = require("../server/sysstate")
router.prefix('/sys')

router.get("/", (ctx, next) => {
    let asyget = async () => {
        try {
            console.log(1)
            let data = await get
            console.log("data："+data)
            ctx.body = data
        } catch (error) {
            console.log(error)
        }
    }
    asyget()
})







module.exports = router