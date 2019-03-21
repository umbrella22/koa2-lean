const osutlis = require("os-utils")
module.exports = () => {
    return new Promise((resolve, reject) => {
        osutlis.cpuUsage(function (value) {
            return resolve(value * 100.0)
        });
    })
}