const osutlis = require("os-utils")
// const io = require("socket.io").listen(8000)
var tools = require('./tools')
var interval = -1;
var freeMem, totalMem, usedMem, currCPU = 0;


async function getsysmsg() {
    if (osutlis.platform() === 'linux') {
        usedMem = await tools.linuxMem()
        currCPU = await tools.cpu()
        totalMem = osutlis.totalmem(value => value / (1024 * 1024 * 1024 * 1024))
        freeMem = totalMem - usedMem
    } else {
        currCPU = await tools.cpu().toFixed(1)
        freeMem = osutlis.freemem(value => value / (1024 * 1024 * 1024 * 1024)).toFixed(1),
            totalMem = osutlis.totalmem(value => value / (1024 * 1024 * 1024 * 1024)).toFixed(1),
            usedMem = totalMem - freeMem
    }
    return {
        '空闲内存': freeMem + 'MB',
        '总内存': totalMem + 'MB',
        '已使用的内存': usedMem + 'MB',
        'cpu使用率': currCPU + '%'
    }
}

function pullsysmsg() {
    getsysmsg().then(res => {
        tools.socket(res)
    })
}


module.exports = () => pullsysmsg()