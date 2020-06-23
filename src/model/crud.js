const { connection } = require('../config/connection');
const crud = {};

connection.connect(err => {
    if(err) throw err;
})

async function getTasks(){

    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM tasks";
        connection.query(sql, (err, result) => {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })

}

async function createTask(datas){

    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO tasks(title, description, color, statu) VALUES (?)";
        connection.query(sql, [datas], (err, result) => {
            if(err){
                console.log(err)
                reject()
            }else{
                resolve(result.affectedRows)
            }
            
        })
    })
}


async function updateTask(datas){
    return new Promise((resolve, reject) => {
        let sql = "UPDATE tasks set title = ?, description = ?, color = ?, statu = ? WHERE id_task = ?";
        connection.query(sql, datas,(err, result) => {
            if(err){
                reject(err);
            }else{
                resolve(result)
            }
        })
    })
}

async function deleteTask(id){
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM tasks WHERE id_task = ?";
        connection.query(sql, id, (err, result) => {
        if(err){
            reject(err);
        }else{
            resolve(result);
        }
    })
    })
}

crud.getTasks = getTasks;
crud.createTask = createTask;
crud.updateTask = updateTask;
crud.deleteTask = deleteTask;
module.exports = crud;