const signupForm = document.getElementById('signupForm')
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    cleanErrors();
    let form_validation = true;

    if (!isRequired(document.getElementById('username').value)) {
        showError('username', 'Este es un campo requerido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('email').value)){
        showError('email', 'Este es un campo requerido');
        form_validation = false;
    } else if (!isEmailValid(document.getElementById('email').value)) {
        showError('email', 'No es un email válido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('passwd').value)) {
        showError('passwd', 'Este es un campo requerido');
        form_validation = false;
    }

    if (form_validation){
        let formdata = new FormData(signupForm)
        let data = {
            username: formdata.get('username'),
            email: formdata.get('email'),
            passwd: formdata.get('passwd'), 
        }

        fetch('http://localhost:8080/signup', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(info => {
            if (info.registered === true){
                location.replace('/dashboard')
            } else {
                location.replace('/failSignup')
            }
        });
    }

});
