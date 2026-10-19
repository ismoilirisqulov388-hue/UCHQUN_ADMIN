const btn = document.getElementById("btn");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");

const method = new Method();

btn.addEventListener("click", () =>{

    const password = passwordInput.value.trim();
    const email = emailInput.value.trim();

    let body = {
        email:email,
        password:password
    };

    method.postLogin("https://django-production-c898.up.railway.app/api/v1/auth/login/", body).then(response => {
        console.log(response);
    })

})
