const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector(".wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) =>{
    countValue.innerText = taskCount;
};

const addTask = ()=>{
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if(!taskName){
        setTimeout(() => {
            error.style.display = "block";
        },200);
        return;
    }
    const task = `<div class="task p-4 bg-white text-black rounded-md relative flex justify-center items-center gap-2">
    <input type="checkbox" class="task-check relative mr-5">
    <span class="taksName text-center text-wrap break-all	w-[70vh] text-2xl">${taskName}</span>
    <button class="edit p-1">
    <i class="ri-edit-circle-line text-3xl hover:font-normal font-bold"></i> 
    </button>
    <button class="delete p-1">
    <i class="ri-delete-bin-2-line text-3xl hover:font-normal font-bold"></i>
    </button>
    </div>`;

    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });


    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if(!(e.target.className == "edit")){
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });
     const tasksCheck = document.querySelectorAll(".task-check");
     tasksCheck.forEach((checkBox) => {
        checkBox.onchange = () =>{
checkBox.nextElementSibling.classList.toggle("completed")
;
            if(checkBox.checked){
                taskCount -= 1;
            }else{
                taskCount += 1;
            }
            displayCount(taskCount);
        }
     })
     taskCount += 1;
     displayCount(taskCount);
     newTaskInput.value = "";
};


addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
}