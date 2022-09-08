document.getElementById("taskInputSubmit").style.visibility = "hidden";
document
  .getElementById("taskInputSubmit")
  .addEventListener("submit", taskInputSubmit);
document.getElementById("newtask").addEventListener("click", showForm);
document
  .getElementById("taskCancel")
  .addEventListener("click", taskInputCancel);
document.getElementById("deleteall").addEventListener("click", deleteAll);
document.getElementById("showhide").addEventListener("click", showHide);

let taskOrder = 0;
var Task = [];
let visibility = true;

function taskInputSubmit(event) {                                                                  //function to take data from input
  event.preventDefault();
 

  let taskName, taskDescription, taskDate, taskUrgent;

  taskName = event.target[0].value;
  taskDescription = event.target[1].value;
  taskCategory = event.target[2].value;
  taskDate = event.target[3].value;
  taskUrgent = event.target[4].checked;

  
  Task[taskOrder] = objectifyTask(                                                                  //convert task data into an object
    
    taskName,
    taskDescription,
    taskCategory,
    taskDate,
    taskUrgent,
    taskOrder
  );

  //console.log(Task);

  appendTask(Task[taskOrder]);                                                                        //append task to the task list

  taskOrder = taskOrder + 1;                                                                          //increment task order

  document.getElementById("taskInputSubmit").reset();
  document.getElementById("taskInputSubmit").style.visibility = "hidden";
}

function taskInputCancel() {                                                                          //cancel button logic
  document.getElementById("taskInputSubmit").reset();
  document.getElementById("taskInputSubmit").style.visibility = "hidden";
}

function showForm() {                                                                                 //Add a task to show the input form
  document.getElementById("taskInputSubmit").style.visibility = "visible";
}

function objectifyTask(                                                                               //function to convert input data into an object
  taskName,
  taskDescription,
  taskCategory,
  taskDate,
  taskUrgent,
  taskOrder
) {
  Task[taskOrder] = {
    taskName: taskName,
    taskDescription: taskDescription,
    taskCategory: taskCategory,
    taskDate: taskDate,
    taskUrgent: taskUrgent,
    taskOrder: taskOrder,
  };
  

  return Task[taskOrder];
}

function appendTask(Task) {                                                                         //function to display the task in the task display area
  let li = document.createElement("li");
  let p = document.createElement("p");
  let ul = document.getElementById("taskDisplayArea");
  let buttonspan = document.createElement("span");

  ul.appendChild(li);
  li.appendChild(p);
  li.appendChild(buttonspan);
  li.setAttribute("id", "li-" + taskOrder);
  li.setAttribute("class", "tasklist");
  p.setAttribute("id", "p-" + taskOrder);
  buttonspan.setAttribute("id", "buttonspan-" + taskOrder);
  buttonspan.setAttribute("class", "buttonspan");
  p.setAttribute("class", "taskdetails");

  if (Task.taskUrgent == true) {                                                                  //urgent tasks are displayed in bold font
    p.style.fontWeight = "bold";
  }

  p.append(
    `${Task.taskDate}: ${Task.taskCategory}, ${Task.taskName}: ${Task.taskDescription}`
  );

  let button = document.createElement("button");
  let button2 = document.createElement("button");
  let button3 = document.createElement("button");
  let button4 = document.createElement("button");

  let buttonspanselector = document.getElementById(
    "buttonspan-" + Task.taskOrder
  );

  buttonspanselector.appendChild(button);
  buttonspanselector.appendChild(button2);
  buttonspanselector.appendChild(button3);
  buttonspanselector.appendChild(button4);

  button.setAttribute("type", "button");
  button.setAttribute("class", "btn btn-primary");
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#exampleModal");
  button.setAttribute("id", "Edit-" + taskOrder);
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
</svg>`;
  button.setAttribute("onclick", `editTask(Task[${taskOrder}])`);

  button2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
</svg>`;
  button2.setAttribute("type", "button");
  button2.setAttribute("class", "btn btn-primary");
  button2.setAttribute("id", "del-" + taskOrder);
  button2.setAttribute("onclick", `deleteTask(Task[${taskOrder}])`);

  button3.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
</svg>`;
  button3.setAttribute("type", "button");
  button3.setAttribute("class", "btn btn-primary");
  button3.setAttribute("id", "up-" + taskOrder);
  button3.setAttribute("onclick", `orderUp(Task[${taskOrder}])`);

  button4.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
</svg>`;
  button4.setAttribute("type", "button");
  button4.setAttribute("class", "btn btn-primary");
  button4.setAttribute("id", "down-" + taskOrder);
  button4.setAttribute("onclick", `orderDown(Task[${taskOrder}])`);
}

function editTask(Task) {                                                                          //edit task function, brings up a bootstrap modal to edit task properties
  let saveTask = document.getElementById("saveTask");
  saveTask.disabled = false;
  let saved = document.getElementById("saved");
  saved.innerHTML = "";

  //console.log("clicked", Task);
  document.getElementById("editName").value = Task.taskName;
  document.getElementById("editDescription").value = Task.taskDescription;
  document.getElementById("editCategory").value = Task.taskCategory;
  document.getElementById("editDate").value = Task.taskDate;
  document.getElementById("editUrgent").checked = Task.taskUrgent;
  document
    .getElementById("saveTask")
    .setAttribute("onclick", `saveTask(Task[${Task.taskOrder}])`);
}

function saveTask(Task) {                                                                         //function to overwrite the task object with edited data
  Task.taskName = document.getElementById("editName").value;
  Task.taskDescription = document.getElementById("editDescription").value;
  Task.taskCategory = document.getElementById("editCategory").value;
  Task.taskDate = document.getElementById("editDate").value;
  Task.taskUrgent = document.getElementById("editUrgent").checked;

  //console.log(Task);

  let saveTask = document.getElementById("saveTask");
  saveTask.disabled = true;

  let saved = document.getElementById("saved");
  saved.append("Task Saved!");
  saved.style.color = "green";

  updateTasktoList(Task);
}

function updateTasktoList(Task) {                                                                 //function to add the updated task to the list in the appropriate order
  let p = document.getElementById("p-" + Task.taskOrder);
  let li = document.getElementById("li-" + Task.taskOrder);
  let buttonspan = document.getElementById("buttonspan-" + Task.taskOrder);

  li.removeChild(p);

  let newp = document.createElement("p");
  newp.setAttribute("id", "p-" + Task.taskOrder);
  newp.setAttribute("class", "taskdetails");
  newp.append(
    `${Task.taskDate}: ${Task.taskCategory}, ${Task.taskName}: ${Task.taskDescription}`
  );

  if (Task.taskUrgent == true) {
    newp.style.fontWeight = "bold";
  }

  li.insertBefore(newp, buttonspan);
}

function deleteTask(Task) {                                                                       //delete task function
  let li = document.getElementById("li-" + Task.taskOrder);
  let ul = document.getElementById("taskDisplayArea");

  ul.removeChild(li);

  
}

function orderUp(Task) {                                                                         //change task order to go one up
 

  let li = document.getElementById("li-" + Task.taskOrder);
  let ul = document.getElementById("taskDisplayArea");
  let liabove = li.previousElementSibling;

  if (liabove) ul.insertBefore(li, liabove);
}

function orderDown(Task) {                                                                       //change task order to go one down


  let li = document.getElementById("li-" + Task.taskOrder);
  let ul = document.getElementById("taskDisplayArea");
  let libelow = li.nextElementSibling;

  if (libelow) ul.insertBefore(li, libelow.nextElementSibling);
}

function deleteAll() {                                                                           //delete all tasks function
  let ul = document.getElementById("taskDisplayArea");
  ul.innerHTML = "";
}

function showHide() {                                                                            //function to show/hide all tasks
  let ul = document.getElementById("taskDisplayArea");
  let button = document.getElementById("showhide");

  if (visibility == true) {
    ul.style.visibility = "hidden";
    button.innerHTML = "Show All";
    visibility = false;
  } else {
    ul.style.visibility = "visible";
    button.innerHTML = "Hide All";
    visibility = true;
  }
}
