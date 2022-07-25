
const signInBtn = document.querySelector('.signin-btn')
const signUBtn= document.querySelector('.form__btn_signup')

const signUpBtn = document.querySelector('.signup-btn')
const signIBtn = document.querySelector('.form__btn')

const formBox = document.querySelector('.form-box')
const body = document.body


signUpBtn.addEventListener('click', function(){
    formBox.classList.add('active')
    body.classList.add('active')
})

signInBtn.addEventListener('click', function(){
    formBox.classList.remove('active')
    body.classList.remove('active')

})

signUBtn.addEventListener('click', async function(){

    const email = document.getElementById('sign_up_email').value
    const pass = document.getElementById('sign_up_pass').value
    await fetch('http://localhost:5000/sign-up',
    {   method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
         {"email": email,
        "password": pass
        }
     ) 
    })
     .then(data =>{
        
        document.location.href = "http://localhost:5000/profile"

    }).catch(e=>{console.log(e)})
})

signIBtn.addEventListener('click', async function(){
    const email = document.getElementById('sign_in_email').value
    const pass = document.getElementById('sign_in_pass').value
    await fetch('http://localhost:5000/login',
    {   method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
         {"email": email,
        "password": pass
        }
     ) 
    })
     .then(data =>{
        document.location.href = "http://localhost:5000/profile"
         
    }).catch(e=>{console.log(e)})
})


