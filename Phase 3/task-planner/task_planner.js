
const http = require("http");
const url = require("url");
const fs = require("fs");

let tableHtml = "";

let styleHtml=`
<style>
    label {
        padding-right: 2rem;
    }
    div{
        margin-bottom: 1rem;
        padding: 5px;
    }
    .button {
        background-color: #555555;; /* Green */
        border: none;
        color: white;
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 100vh;
    }
</style>
`

let showTasksHtml=`
<div style="background-color: #cad3c2;">
<h3>Delete Task</h3>
<hr>
<div>
    <form action="deleteTask" method="GET">
        <label for="taskId">Task Id:</label>
        <input type="text" name="taskId" required/>
        <input type="submit" value="Delete Task" class="button">
    </form>
</div>
<h3>List Tasks</h3>
<div>
    <form action="listAllTask">
        <input type="submit" value="List All Task" class="button">
    </form>
</div>
<hr>
</div>
`

let addTaskHtml = `
<div style="background-color: #eaf1e3;">
<h3>Add Task</h3>
<hr>
<form action="addTask" method="GET">
    <div>
        <label for="empId">Emp Id:</label>
        <input type="number" name="empId" required/>
    </div>

    <div>
        <label for="taskId">Task Id:</label>
        <input type="number" name="taskId" required/>
        
    </div>
    <div>
        <label for="task">Task:</label>
        <input type="text" name="task" required/>
    </div>

    <div>
        <label for="deadline">Deadline:</label>
        <input type="date" name="deadline" required/>

    </div>

    <div>
        <input type="submit" value="Add Task" class="button">
    </div>
</form>
</div>
`

let taskHtml = `
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Task Planner</title>
        ${styleHtml}
    </head>

    <body>
        <h1 style="display: flex; justify-content: center;">Task Planner</h1>
        ${addTaskHtml}
        ${showTasksHtml}
`

let endHtml = `
    <!-- <h1>hdhdhdhdhh</h1> -->
    </body>
</html>
`

let startTableHTML = 
`
<div style="background-color:#eaf1e3; padding: 5px; margin: auto;">
        <table  border=1" style="width:100%">
            <col span="1" style="width: 15%;"/>
            <col span="1" style="width: 15%;"/>
            <col span="1" style="width: 55%;"/>
            <col span="1" style="width: 15%;"/>
            <tr>
                <th>Employee Id</th>
                <th>Task Id</th>
                <th>Task</th>
                <th>Deadline</th>
            </tr>
`
let tableEndHTML =
`
</table>
    </div>
</body>
</html>
`



function createTable(taskList){
    let tableContent = "";
    taskList.forEach( (task) => {
        tableContent +=    `
            <tr>
                <td>${task.empId}</td>
                <td>${task.taskId}</td>
                <td>${task.task}</td>
                <td>${task.deadline}</td>
            </tr>
        `
    });
    return tableContent;

}

// reads the task.json file, if the file does not exits create it.
function readTaskFile(file){
    let fileContents;
    try {
        fileContents = fs.readFileSync(file);
        fileContents = fileContents.toString();
        console.log("reading the file")
        return JSON.parse(fileContents);
        
    } catch (err) {
        console.log("Creating New task file.");
        fs.writeFileSync(file,"[]",{flag:"a+"});
        return  [];         
    }
}

// adds a task to the tasks.json file
// @params: file: fileName, task:  taskList
function storeTask(file,taskList){

    try{
        fs.writeFileSync(file,JSON.stringify(taskList));
        console.log("new task stored successfully");
    } catch(err){
        console.log("failed to store new task");
    }

}

function main(){
    let server = http.createServer((req,res)=> {

        let urlInfo = url.parse(req.url,true);

        // get the task list from  task.json file
        let taskList = readTaskFile("tasks.json");

       console.log(urlInfo.pathname);
        if(urlInfo.pathname === "/"){ // root
            console.log("root");
            res.write(taskHtml + endHtml) ;
        }

        if(urlInfo.pathname === "/addTask"){
            console.log("addTask");
            let newTask = urlInfo.query;
            newTask = JSON.parse(JSON.stringify(newTask))
            console.log(taskList);
            let foundTask = taskList.find(task => task.taskId === newTask.taskId);
            
            //taskHtml;
            let dupTaskDiv = "";
            if(foundTask){ // task ID already exist
                console.log("FOUND");
                dupTaskDiv =  `<div> <h1>Task with the id ${newTask.taskId} already exist </div> </h1>`;
            }else{
                taskList.push(newTask);
                storeTask("tasks.json", taskList);
            }

            let tableContentHtml = createTable(taskList);
            tableHtml =  startTableHTML + tableContentHtml + tableEndHTML
            res.write(taskHtml + dupTaskDiv + tableHtml + endHtml);
            //console.log(taskList);

        }

        if(urlInfo.pathname === "/deleteTask"){
           
            let _taskId = urlInfo.query;
            let {taskId} = JSON.parse(JSON.stringify(_taskId));
            console.log(`delete task with the id ${taskId}`);

            let foundTask = taskList.find(task => task.taskId === taskId);
            let taskExist = "";
            if(foundTask){ // task ID already exist
                // keep only the task that is not equal to taskId that is to be deleted
                taskList = taskList.filter(task => task.taskId != taskId);
                // update the file
                storeTask("tasks.json", taskList);

            }else{
                taskExist =  `<div> <h1>Task with the id ${taskId} does not exist </div> </h1>`;
            }

            let tableContentHtml = createTable(taskList);
            tableHtml =  startTableHTML + tableContentHtml + tableEndHTML
            res.write(taskHtml + taskExist + tableHtml + endHtml);

        }

        if(urlInfo.pathname === "/listAllTask"){
            console.log("listAllTask");
            let tableContentHtml = createTable(taskList);
            tableHtml =  startTableHTML + tableContentHtml + tableEndHTML
            res.write(taskHtml + tableHtml + endHtml);

        }

        res.end()
    });

    server.listen(9090,()=>console.log("Server running on port number 9090"));



}


main();