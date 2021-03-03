// define ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listners
loadEventListners();

//load all event listners
function loadEventListners() {
  //dom load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks event 
  filter.addEventListener('keyup', filterTasks);
}

//get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    //create li elements
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and apppend to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    //apend li to ul
    taskList.appendChild(li);
  });
}


//add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task');
  }

  //create li elements
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //create text node and apppend to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);

  //apend li to ul
  taskList.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);


  // console.log(li);

  //clear input
  taskInput.value = '';


  e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
 
      e.target.parentElement.parentElement.remove();
      //remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    
  }
}

//remove from ls
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
       tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clear tasks
function clearTasks() {
  // if (confirm('Are you Sure?')) {
  //   taskList.innerHTML = '';
  // }

  //faster method
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
 // Clear from LS
  clearTasksFromLocalStorage();

}
// Clear Tasks from LS
 function clearTasksFromLocalStorage(){
   localStorage.clear();
 }

//filter task
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
    (function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}