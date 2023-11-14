const addTaskBtn = document.querySelector('.btn');
const taskInput = document.querySelector("#input");
const error = document.querySelector('#error');
const taskContainer = document.querySelector('.task-container');

const addTask = () => {
    const taskName = taskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 250);
        return;
    }

    const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <div class="icons">
            <button class="edit">
                <i class="bx bx-edit"></i>
            </button>
            <button class="delete">
                <i class="bx bx-trash"></i>
            </button>
        </div>
    </div>`;

    taskContainer.insertAdjacentHTML("beforeend", task);

    taskInput.value = '';

    const deleteBtn = document.querySelectorAll('.delete');
    const editBtn = document.querySelectorAll('.edit');
    const checkboxes = document.querySelectorAll('.task-check');

    deleteBtn.forEach(button => {
        button.onclick = () => {
            const taskElement = button.closest('.task');
            if (taskElement) {
                taskElement.remove();
            }
        };
    });

    editBtn.forEach(button => {
        button.onclick = () => {
            const taskElement = button.closest('.task');
            const taskNameElement = taskElement.querySelector('.taskname');

            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = taskNameElement.textContent;

            inputField.addEventListener('blur', () => {
                taskNameElement.textContent = inputField.value;
                inputField.replaceWith(taskNameElement);
            });

            taskNameElement.replaceWith(inputField);
            inputField.focus();
        };
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const taskElement = checkbox.closest('.task');
            const taskNameElement = taskElement.querySelector('.taskname');

            if (checkbox.checked) {
                taskNameElement.style.textDecoration = 'line-through';
            } else {
                taskNameElement.style.textDecoration = 'none';
            }
        });
    });
};

addTaskBtn.addEventListener('click', addTask);
