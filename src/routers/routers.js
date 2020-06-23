const handler = require('../libs/handlers');

const routers = (req, res) => {
    const { url, method } = req;
    const add = /^[/]{1}(tasks)[/]{1}[?]{1}[a-z0-9A-Z]{2,}\={1}[a-z0-9A-Z]{1,}$/
    switch(method){
        case "GET":
            if(url === "/tasks"){
                handler.getTasksHandler(res)
            }
            break; 

        case "POST":
            if(url === "/tasks"){
                handler.createTaskHandler(req, res);
            }
            break;

        case "PUT":
            if(add.test(url)){
                handler.updateTaskHandler(req, res);
            }
            break;
        
        case "DELETE":
            if(add.test(url)){
                handler.deleteTaskHandler(req, res);
            }
            break;
        
        default:
            console.log('funcionando')
            res.writeHead(400, {"content-type": "application/json"});
            res.write(JSON.stringify({"error": "No Found"}));
            res.end();
    }
}

module.exports = { routers };