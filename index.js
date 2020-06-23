const http = require('http');
const { routers } = require('./src/routers/routers')

const server = http.createServer((req, res) => {

    const { url, method } = req;
    console.log(`URL: ${url} -- METHOD: ${method}`);
    routers(req, res);
})

server.listen(5000, () => {
    console.log("conectado");
})