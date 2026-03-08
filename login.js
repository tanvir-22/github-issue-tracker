const username = document.getElementById('username');
const password = document.getElementById('password');

const signin = document.getElementById('signinBtn');

signin.addEventListener('click',()=>{
    if(username.value==='admin' && password.value==='admin123'){
        window.location.href = 'dashboard.html'
        
    }
    else{
        alert("Wrong Credential: Try Again!")
    }
})
