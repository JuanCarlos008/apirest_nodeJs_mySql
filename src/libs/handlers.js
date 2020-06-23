const crud = require('../model/crud');
const { bodyParser } = require('./bodyParser');
const url = require('url');
const handler = {};

async function getTasksHandler(res){
    try {
        const result = await crud.getTasks();
        res.writeHead(200, {"content-type": "application/json"});
        res.write(JSON.stringify(result));
        res.end();
    } catch (error) {
        res.writeHead(400, {"content-type": "application/json"});
        res.write(JSON.stringify({"error": "invalid"}));
        res.end();
    }
}


async function createTaskHandler(req, res){
    try {
        const datas = [];
        await bodyParser(req);

        datas.push(req.body.title);
        datas.push(req.body.description);
        datas.push(req.body.color);
        datas.push(req.body.statu);
        
        const result = await crud.createTask(datas);
        if(result > 0){
            console.log("Affected Rows: ", result);
            const resultado = await crud.getTasks();
            res.writeHead(200, {"content-type": "application/json"});
            res.write(JSON.stringify(resultado));
            res.end();
        }

    } catch (err) {
        res.writeHead(400, {"content-type": "application/json"});
        res.write(JSON.stringify({"error": "invalid"}));
        res.end();
    }

}


async function updateTaskHandler(req, res){
    try {
        const datas = [];
        let q = url.parse(req.url, true);
        let qData = q.query;
        let qID = qData[Object.keys(qData)]
        await bodyParser(req);

        datas.push(req.body.title);
        datas.push(req.body.description);
        datas.push(req.body.color);
        datas.push(req.body.statu);
        datas.push(qID)
        const result = await crud.updateTask(datas)

        if(result.affectedRows > 0){
            console.log("Affect Rows: ", result.affectedRows);
            const resultado = await crud.getTasks();
            res.writeHead(200, {"content-type": "application/json"});
            res.write(JSON.stringify(resultado));
            res.end();
        }

    } catch (err) {
        res.writeHead(400, {"content-type": "application/json"});
        res.write(JSON.stringify({"error": "invalid"}));
        res.end();
    }
}

async function deleteTaskHandler(req, res){
    try {
        let q = url.parse(req.url, true);
        let qData = q.query;
        let qID = qData[Object.keys(qData)]
        const result = await crud.deleteTask(qID);
        if(result.affectedRows > 0){
            console.log("Affect Rows: ", result.affectedRows);
            const resultado = await crud.getTasks();
            res.writeHead(200, {"content-type": "application/json"});
            res.write(JSON.stringify(resultado));
            res.end();
    }
    } catch (error) {
        res.writeHead(400, {"content-type": "application/json"});
        res.write(JSON.stringify({"error": "invalid"}));
        res.end();
    }
}

handler.getTasksHandler = getTasksHandler;
handler.createTaskHandler = createTaskHandler;
handler.updateTaskHandler = updateTaskHandler;
handler.deleteTaskHandler = deleteTaskHandler;
module.exports = handler;