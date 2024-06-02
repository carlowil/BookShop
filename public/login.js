$(document).ready(function(){
    const form = document.querySelector('form')
    const username = document.querySelector('#emailInput')
    const password = document.querySelector('#passwordInput')
    const alert = document.querySelector('.error')
    form.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: username.value, password: password.value }),
        headers: { 'Content-Type': 'application/json' }
        }).then((data) => {
            return data.json();
        }).then((message) => {
            if (message.status == 400 || message.status == 401) {
                alert.style.display = "";
                return alert.textContent=message.message;
            }
            message.role === "admin" ? location.assign('/admin') : location.assign('/shop')
        })
    } catch (err) {
        console.log(err.message)
        }
    });
});



