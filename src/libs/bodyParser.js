async function bodyParser(req){
    return new Promise((resolve, reject) => {
        let allData = "";
        req
            .on('err', err => {
                console.log(err)
                reject()
            })
            .on('data', chunk => {
                allData += chunk;
            })
            .on('end', () => {
                req.body = JSON.parse(allData);
                resolve();
            })
    })
}

module.exports = { bodyParser };