const username = document.getElementById('username');
const password = document.getElementById('password');

const signin = document.getElementById('signinBtn');

signin.addEventListener('click',()=>{
    if(username.value==='admin' && password.value==='admin123'){
        window.location.assign('/dashboard.html')
        console.log(window.location);
    }
    else{
        alert("Wrong Credential: Try Again!")
    }
})