document.addEventListener('DOMContentLoaded', function () {

    const taskInputElement = document.querySelector('.js-task');
    taskInputElement.placeholder = 'insert for both add and update';
    const dateInputElement = document.querySelector('.js-task-date');
    const pUsername = document.querySelector('.js-username');


    // add new task to the database by using POST request to the API
    document.querySelector('.js-action-add-btn').addEventListener('click', () => {
        console.log(taskInputElement.value, dateInputElement.value)
        const username = pUsername.innerText;
        console.log(username)
        data = {
            'username': username,
            'task': taskInputElement.value,
            'date': dateInputElement.value,
        };
        fetch('http://localhost:5001/api/v1/user/addtask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log(response.ok)
            fetchAlltasksFromDB()
        })
    });



    // fetch all task from dataabse by API and generate html based on this data
    // I'm usng POST request here but you can use get and pass the username in the URL
    async function fetchAlltasksFromDB() {
        const todoListElement = document.querySelector('.todo-rows');

        const response = await fetch('http://localhost:5001/api/v1/user/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': pUsername.innerText}),
        })
        const tasks = await response.json()
        
        let HTML = ``;
        for (const task of tasks) {
            HTML += `
                <div class="dodo-row js-dodo-row">
                    <div class="tr-todo">${task.todo}</div>
                    <div class="tr-date">${task.date}</div>
                    <div class="tr-action">
                        <button class="delete-btn js-delete-button">delete</button>
                        <button class="update-btn js-update-btn">update</button>
                    </div>
                </div>
            `;
        }
        todoListElement.innerHTML = HTML;

        // I'm adding event listener to each delete button her in the async function because i can't do that
        // outside this function
        document.querySelectorAll('.js-delete-button').forEach((button, index) => {
            button.addEventListener('click', () => {
                deleteTask(index);
            })
        });

        // I'm adding event listener to each update button her in the async function because i can't do that
        // outside this function
        document.querySelectorAll('.js-update-btn').forEach((button, index) => {
            button.addEventListener('click', () => {
                updateTask(index);
            })
        });
    }

    fetchAlltasksFromDB()

    // this function is for deleting the task in the database
    // I'm using the same method with delete like update
    // I'm sending the index of the task that I deleting and the username
    // why username because I need to find the username id if I wanna get list of all task that this user has created and becuase
    // of the way I set up the tables relationship
    async function deleteTask(index) {
        const response = await fetch(`http://localhost:5001/api/v1/user/tasks/${index}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': pUsername.innerText}),
        });

        const state = response.ok;
        if (state) {
            // after the update is success wi update the data on the page
            fetchAlltasksFromDB();
        }
    }

    // this function for updating data in the database
    // and we are using an API to update the database
    // we're updating the task by the index that we're sending in the URL of the each task and the username
    // I'm sending the username in the body of the request with the new task
    async function updateTask(index) {
        const response = await fetch(`http://localhost:5001/api/v1/user/tasks/${index}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': pUsername.innerText,
                'task': taskInputElement.value != '' ? taskInputElement.value: null,
            }),
        });

        const state = response.ok;
        if (state) {
            // after the update is success wi update the data on the page
            fetchAlltasksFromDB();
        }
    }


});