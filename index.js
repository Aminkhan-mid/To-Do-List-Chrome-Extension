const inputEl = document.getElementById("input-el");
const addBtn = document.getElementById("add-btn");
const delAll = document.getElementById("del-all");
const taskList = document.getElementById("task-list");
const container = document.getElementById("container");


let myTasks = [];
let taskFromLocalStorage = JSON.parse(localStorage.getItem("Zoro Tasks"));

if(taskFromLocalStorage){
    myTasks = taskFromLocalStorage;
    render(myTasks);
}

addBtn.addEventListener("click", addTask);
inputEl.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function addTask(){
    if (inputEl.value.trim() !== ""){
        const newTask = {
            task: inputEl.value.trim(),
            isChecked: false
        };
        myTasks.push(newTask);
        inputEl.value = "";
        localStorage.setItem("Zoro Tasks", JSON.stringify(myTasks));
        render(myTasks);
    }
}

function render(tasks) {
    let totalTask = "";
    for(let i = 0; i < tasks.length; i++){
        totalTask += 
        `
        <li class="list">
            ${tasks[i].task}
            <button class="del-btn" data-index="${i}">DEL</button>
            <input class="checkBox" type="checkbox" data-index="${i}" ${tasks[i].isChecked ? "checked" : ""}></input>
        </li>
        `;
    }
    taskList.innerHTML = totalTask;
    
    const delKey = document.querySelectorAll(".del-btn");
    delKey.forEach(button => {
        button.addEventListener("click", function(){
            const index = button.getAttribute("data-index");
            deleteTask(index);
        });
    });

    document.querySelectorAll(".checkBox").forEach(checkbox => {
        checkbox.addEventListener("change", function(){
            const index = checkbox.getAttribute("data-index");
            myTasks[index].isChecked = checkbox.checked;
            localStorage.setItem("Zoro Tasks", JSON.stringify(myTasks));
        });
    });
}

function deleteTask(index){
    myTasks.splice(index, 1);
    localStorage.setItem("Zoro Tasks", JSON.stringify(myTasks));
    render(myTasks);
}

delAll.addEventListener("dblclick", function(){
    localStorage.clear();
    myTasks = [];
    render(myTasks);
});
