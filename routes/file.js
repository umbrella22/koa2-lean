const router = require('koa-router')()
const OSS = require('ali-oss')

let client = new OSS({
    region:'oss-cn-shenzhen',
    accessKeyId:'LTAIZCrPP7BSEBZ1',
    accessKeySecret:''
})









module.exports = router