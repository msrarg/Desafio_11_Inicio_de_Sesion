const isRequired = value => value === '' ? false : true;

const showError = (input_id, message) => {
    const input = document.querySelector(`#${input_id}`);
    input.classList.add('is-invalid');
    const error = input.parentElement.querySelector('.invalid-feedback');
    error.textContent = message;
};

const cleanErrors = () => {
    const elements = document.querySelectorAll(".form-control, .form-select");
    elements.forEach(function (element) {
        element.classList.remove('is-invalid');
    });
}

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};