
document.addEventListener('DOMContentLoaded', function () {
   document.querySelector('.js-login-btn').addEventListener('click', () => {
    const username = document.querySelector('.js-log-in-username').value;
    const password = document.querySelector('.js-log-in-password').value;

    data = {
        'username': username,
        'password': password
    };

    fetch('http://localhost:5001/api/v1/users/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }). then(response => {
        if (response.ok) {
            window.location.href = `http://localhost:2222/todo?username=${username}`;
        } else {
            window.location.href = `http://localhost:2222/`;
        }
    })
   })
});
