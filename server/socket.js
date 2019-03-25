const io = require('socket.io')(8080)
const tools = require('./tools')

function Io() {

    io.on('connection', socket => {
        let state = async () => {
            try {
                let data = await tools.state()
                console.log(data)
                socket.emit('getMsg', data);
            } catch (error) {
                socket.emit('getMsg',error)
            }

        }
        socket.on('send', data => {
            console.log('客户端发送的内容：', data);
            socket.emit('getMsg', '握手完成');
            state()
        })



    })
}
module.exports = () => Io()