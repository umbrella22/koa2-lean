const osutlis = require("os-utils")
var tools = require('./index')
var freeMem, totalMem, usedMem, currCPU = 0;


async function getsysmsg() {
    console.log(1)
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
        '空闲内存': freeMem.toFixed(1) + 'MB',
        '总内存': totalMem.toFixed(1) + 'MB',
        '已使用的内存': usedMem + 'MB',
        'cpu使用率': currCPU.toFixed(1) + '%'
    }
}



module.exports = () => getsysmsg()