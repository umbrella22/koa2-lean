const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require('koa2-cors')

const index = require("./routes/index");
const users = require("./routes/users");
const sys = require("./routes/syslinten");
// const server = require('http').Server(app.callback())
// const io = require('socket.io')(server)

// io.on('connection', socket => {
//   console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
//   socket.on('send', data => {
//     console.log('客户端发送的内容：', data);
//     socket.emit('getMsg', '我是返回的消息... ...');
//   })

//   setTimeout(() => {
//     socket.emit('getMsg', '我是初始化3s后的返回消息... ...')
//   }, 3000)
// })
// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));
// app.use(cors({
//   origin: function (ctx) {
//       if (ctx.url === '/test') {
//           return "*"; // 允许来自所有域名请求
//       }
//       return '*'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(sys.routes(), sys.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;