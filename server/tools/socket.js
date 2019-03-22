const io = require('socket.io')(8080)

module.exports = (data) => io.on('connection', socket => {
    // socket.on('send', data => {
    //     console.log('客户端发送的内容：', data);
    //     socket.emit('getMsg', '我是返回的消息... ...');
    // })
    console.log(data)
    if(data == null){
        socket.emit('getMsg', 'NoData');
        return false
    }
    socket.emit('getMsg', data);
    
})