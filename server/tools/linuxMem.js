module.exports = () => {
    return new Promise((resovle, reject) => {
        require('child_process').exec('free -m', (error, stdout, stderr) => {
            if (error) {
                return reject(error)

            } else {
                let lines = stdout.split("\n");

                let str_mem_info = lines[1].replace(/[\s\n\r]+/g, ' ');

                let mem_info = str_mem_info.split(' ')
                return resovle(mem_info[2])
            }
        });
    })
}