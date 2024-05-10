
function initializeTodoList() {
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const task = input.value.trim();
            if (task) {
                addTask(task);
                input.value = '';
            }
        }
    });

    function addTask(task) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.innerHTML = `
            <input type="checkbox">
            <span>${task}</span>
            <button>Delete</button>
        `;
        list.appendChild(todoItem);

        const deleteButton = todoItem.querySelector('button');
        deleteButton.addEventListener('click', function() {
            list.removeChild(todoItem);
            updateLocalStorage();
        });

        const checkbox = todoItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                todoItem.classList.add('completed');
            } else {
                todoItem.classList.remove('completed');
            }
            updateLocalStorage();
        });

        updateLocalStorage();
    }

    function updateLocalStorage() {
        const tasks = [];
        list.querySelectorAll('.todo-item').forEach(function(todoItem) {
            const taskText = todoItem.querySelector('span').textContent;
            const completed = todoItem.classList.contains('completed');
            tasks.push({ text: taskText, completed: completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            addTask(task.text);
            if (task.completed) {
                const lastTodoItem = list.lastChild;
                lastTodoItem.querySelector('input[type="checkbox"]').checked = true;
                lastTodoItem.classList.add('completed');
            }
        });
    }

    loadTasksFromLocalStorage();
}

initializeTodoList();

