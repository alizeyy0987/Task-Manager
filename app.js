const fs = require('fs')
const filePath = 'tasks.json'
function readTasks(callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return callback(err, null)
        const tasks = JSON.parse(data)
        callback(null, tasks)
    })
}
function writeTasks(tasks, callback) {
    fs.writeFile(filePath, JSON.stringify(tasks, null, 2), callback)
}
function createTask(title) {
    readTasks((err, tasks) => {
        if (err) return console.log(err)

        const newTask = {
            id: tasks.length + 1,
            title: title
        }

        tasks.push(newTask)

        writeTasks(tasks, (err) => {
            if (err) console.log(err)
            else console.log(' Created!')
        })
    })
}
function viewTasks() {
    readTasks((err, tasks) => {
        if (err) return console.log(err)
        console.log('All Tasks:', tasks)
    })
}


function editTask(id, newTitle) {
    readTasks((err, tasks) => {
        if (err) return console.log(err)

        const task = tasks.find(t => t.id === id)
        if (!task) return console.log('Not found')

        task.title = newTitle

        writeTasks(tasks, (err) => {
            if (err) console.log(err)
            else console.log(' Updated!')
        })
    })
}


function deleteTask(id) {
    readTasks((err, tasks) => {
        if (err) return console.log(err)

        const newTasks = tasks.filter(t => t.id !== id)

        writeTasks(newTasks, (err) => {
            if (err) console.log(err)
            else console.log('Task Deleted!')
        })
    })
}





//  createTask('aliza pagal')
//  viewTasks()
//  editTask(1, 'aliza puri pagal ha')
deleteTask(2)