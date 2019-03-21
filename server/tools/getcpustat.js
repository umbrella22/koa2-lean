const osutlis = require("os-utils")
module.exports = () => {
    return new Promise((resolve, reject) => {
        osutlis.cpuUsage(function (value) {
            console.log(value)
            return resolve(value * 100.0)
        });
    })
}