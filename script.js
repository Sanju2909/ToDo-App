const taskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");

const searchInput=document.getElementById("searchInput");

const totalTasks=document.getElementById("totalTasks");
const completedTasks=document.getElementById("completedTasks");
const pendingTasks=document.getElementById("pendingTasks");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function updateStats(){

    totalTasks.textContent=tasks.length;

    const completed=tasks.filter(task=>task.completed).length;

    completedTasks.textContent=completed;

    pendingTasks.textContent=tasks.length-completed;

}

function renderTasks(){

    taskList.innerHTML="";

    const keyword=searchInput.value.toLowerCase();

    tasks.forEach((task,index)=>{

        if(!task.text.toLowerCase().includes(keyword)) return;

        const li=document.createElement("li");

        if(task.completed){

            li.classList.add("completed");

        }

        li.innerHTML=`

        <span>${task.text}</span>

        <div class="actions">

        <button class="complete-btn">✓</button>

        <button class="edit-btn">✏</button>

        <button class="delete-btn">🗑</button>

        </div>

        `;

        const completeBtn=li.querySelector(".complete-btn");

        completeBtn.onclick=()=>{

            task.completed=!task.completed;

            saveTasks();

            renderTasks();

        };

        const editBtn=li.querySelector(".edit-btn");

        editBtn.onclick=()=>{

            const updated=prompt("Edit Task",task.text);

            if(updated!==null && updated.trim()!==""){

                task.text=updated.trim();

                saveTasks();

                renderTasks();

            }

        };

        const deleteBtn=li.querySelector(".delete-btn");

        deleteBtn.onclick=()=>{

            if(confirm("Delete this task?")){

                tasks.splice(index,1);

                saveTasks();

                renderTasks();

            }

        };

        taskList.appendChild(li);

    });

    updateStats();

}

addBtn.onclick=()=>{

    const text=taskInput.value.trim();

    if(text===""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text:text,

        completed:false

    });

    taskInput.value="";

    saveTasks();

    renderTasks();

};

taskInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        addBtn.click();

    }

});

searchInput.addEventListener("keyup",renderTasks);

document.getElementById("clearCompleted").onclick=()=>{

    tasks=tasks.filter(task=>!task.completed);

    saveTasks();

    renderTasks();

};

document.getElementById("clearAll").onclick=()=>{

    if(confirm("Are you sure you want to delete all tasks?")){

        tasks=[];

        saveTasks();

        renderTasks();

    }

};

renderTasks();