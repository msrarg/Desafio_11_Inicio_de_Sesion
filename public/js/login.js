const loginForm = document.getElementById('loginForm')
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    cleanErrors();
    let form_validation = true;
    
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
        let formdata = new FormData(loginForm)
        let data = {
            email: formdata.get('email'),
            passwd: formdata.get('passwd'), 
        }

        fetch('http://localhost:8080/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(info => {
            if (info.authenticated === true){
                location.replace('/dashboard')
            } else {
                location.replace('/failLogin')
            }
        });
    }

});
