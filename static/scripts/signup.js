
document.addEventListener('DOMContentLoaded', function () {
    const errorMsg = document.querySelector('.js-error-msg');
    document.querySelector('.js-signup-btn').addEventListener('click', () => {
        console.log('found state', validatedata());
       
    });


    function validatedata() {
        const password1 = document.querySelector('.js-singup-password-1').value;
        const password2 = document.querySelector('.js-singup-password-2').value;
        const userName = document.querySelector('.js-user-name-input').value;
        const msg = 'please ensure both passowrd aren\'t different';


        if (userName === '' || password1 === '' || password2 === '') {
            errorMsg.style.opacity = '1';
            errorMsg.innerText = 'plase enter valid data';
        } else if (password1 !== password2) {
            errorMsg.style.opacity = '1';
            errorMsg.innerText = msg;
        } else {
            loadUsersFromAPI(userName, password1);
        }

    }

    function loadUsersFromAPI(userName, password1) {
        data = {
            'username': userName,
            'password': password1
        }
        fetch('http://localhost:5001/api/v1/users/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }) .then(response => {
            if (response.ok) {
                errorMsg.style.opacity = '1';
                errorMsg.innerText = `this username "${userName}" is already exist`;
            } else {
                console.log('not found')
                registerUserTodb(userName, password1);
            }
        });
    }

    function registerUserTodb(userName, password1) {
            data = {
                'username': userName,
                'password': password1
            }
            fetch('http://localhost:5001/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }). then(response => {
                if (response.ok)
                {
                    errorMsg.style.opacity = '1';
                    errorMsg.innerText = 'you successufuly registred';
                    // password1.value = '';
                    // password2.value = '';
                    // userName.value = '';
                    window.location.href = 'http://localhost:2222/';
                }
            })
    }
});
