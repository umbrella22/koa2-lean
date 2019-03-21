module.exports = ({
    linuxMem: () => require('./linuxMem')(),
    cpu: () => require('./getcpustat')()
});