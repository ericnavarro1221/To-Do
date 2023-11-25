document.getElementById('btn').addEventListener('click', function(){
    let input = document.getElementById('input').value;

    let elem = document.createElement('li');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    let btn2 = document.createElement('button');
    let btnEdit = document.createElement('button'); 
    btn2.innerText = "Delete";
    btnEdit.innerText = "Edit";
    elem.innerText = input;
    let ul = document.querySelector('ul');

    ul.appendChild(elem);
    elem.appendChild(checkbox);
    elem.appendChild(btn2);
    elem.appendChild(btnEdit);

    checkbox.style.marginRight = "3%";
    checkbox.style.margin = "auto";

    btn2.style.border = "none";
    btn2.style.marginLeft = "3%";
    btn2.style.borderRadius = "8px";
    btn2.style.backgroundColor = "#b4b3d8";

    btnEdit.style.border = "none";
    btnEdit.style.marginLeft = "3%";
    btnEdit.style.borderRadius = "8px";
    btnEdit.style.backgroundColor = "#b4b3d8";

    checkbox.addEventListener('change', function(){
        if (checkbox.checked) {
            elem.style.textDecoration = "line-through wavy";
        } else {
            elem.style.textDecoration = "none";
        }
        updateLocalStorage();
    });

btn2.addEventListener('click', function(){
    elem.classList.add('delete-animation');
    setTimeout(function() {
    elem.remove();
    updateLocalStorage();
        }, 500);
    });

    btnEdit.addEventListener('click', function(){
        let newText = prompt("Edit task:", elem.innerText);
        if (newText !== null) {
            elem.innerText = newText;
            updateLocalStorage();
        }
    });

    document.getElementById('input').value = "";
    updateLocalStorage();
});

window.onload = function() {
    loadTasks();
};

function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll('ul li').forEach(function(task) {
        tasks.push({
            text: task.innerText,
            completed: task.querySelector('input').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        tasks.forEach(function(task) {
            let elem = document.createElement('li');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            let btn2 = document.createElement('button');
            let btnEdit = document.createElement('button');
            btn2.innerText = "Delete";
            btnEdit.innerText = "Edit";
            elem.innerText = task.text;
            let ul = document.querySelector('ul');

            ul.appendChild(elem);
            elem.appendChild(checkbox);
            elem.appendChild(btn2);
            elem.appendChild(btnEdit);

            checkbox.style.marginRight = "3%";
            checkbox.checked = task.completed;

            btn2.style.border = "none";
            btn2.style.marginLeft = "3%";
            btn2.style.borderRadius = "8px";
            btn2.style.backgroundColor = "#b4b3d8";

            btnEdit.style.border = "none"; 
            btnEdit.style.marginLeft = "3%";
            btnEdit.style.borderRadius = "8px";
            btnEdit.style.backgroundColor = "#b4b3d8";

            checkbox.addEventListener('change', function(){
                if (checkbox.checked) {
                    elem.style.textDecoration = "line-through";
                } else {
                    elem.style.textDecoration = "none";
                }
                updateLocalStorage();
            });

            btn2.addEventListener('click', function(){
                elem.remove();
                updateLocalStorage();
            });

            btnEdit.addEventListener('click', function(){
                let newText = prompt("Edit task:", elem.innerText);
                if (newText !== null) {
                    elem.innerText = newText;
                    updateLocalStorage();
                }
            });
        });
    }
}