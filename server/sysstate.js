const osutlis = require("os-utils")
const io = require("socket.io").listen(8000)
var tools = require('./tools')
var interval = -1;
var currCPU = 0;
var freeMem, totalMem, usedMem = 0;

function updateCPU() {
    setTimeout(function () {
        osutlis.cpuUsage(function (value) {
            currCPU = value * 100.0;
            updateCPU();
        });
    }, 0);
}
updateCPU();

async function getsysmsg() {
    if (osutlis.platform() === 'linux') {
        usedMem = await tools.linux()
        totalMem = osutlis.totalmem(value => value / (1024 * 1024 * 1024 * 1024)),
        freeMem = totalMem - usedMem
    } else {
        freeMem = osutlis.freemem(value => value / (1024 * 1024 * 1024 * 1024)),
        totalMem = osutlis.totalmem(value => value / (1024 * 1024 * 1024 * 1024)),
        usedMem = totalMem - freeMem
    }
    return {
        '空闲内存': freeMem.toFixed(1) + 'MB',
        '总内存': totalMem.toFixed(1) + 'MB',
        '已使用的内存': usedMem.toFixed(1) + 'MB',
        'cpu使用率': currCPU.toFixed(1) + '%'
    }
}
// io.sockets.on('connection', () => {
//     if (interval < 0) {
//         interval = setInterval(() => {
//             if (osutlis.platform() === 'linux') {

//             } else {
//                 var freeMem = osutlis.freemem(value => value / (1024*1024*1024*1024)),
//                     totalMem = osutlis.totalmem(value => value / (1024*1024*1024*1024)),
//                     usedMem = totalMem - freeMem
//             }
//             io.sockets.emit('sysUpdate', {
//                 currCPU: currCPU * 100.0,
//                 freeMem: freeMem.toFixed(1),
//                 totalMem: totalMem.toFixed(1),
//                 usedMem: usedMem.toFixed(1)
//             })
//         }, 10); //每隔10ms取系统数据  
//     }
// })

module.exports = getsysmsg()