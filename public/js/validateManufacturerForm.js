function validateForm() {
    const closeModifyModalButton = document.querySelector('[data-submit-modify-popup]');
    const name = document.getElementsByClassName('add_manufacurer-name')[0];
    const logo = document.getElementsByClassName('add_manufacurer-logo')[0];

    const errorName = document.getElementById('name_error');
    const errorLogo = document.getElementById('logo_error');
    const submit = document.getElementById('manufacturer-add-row_submit');

    resetErrors([name, logo], [errorName, errorLogo], submit);

    let valid = true;

    if (!checkRequired(name.value)) {
        valid = false;
        errorName.innerText = "Name cannot be empty!";
    } else if (!checkTextLengthRange(name.value, 2, 60)){
        valid = false;
        errorName.innerText = "The field must contain 2-60 characters!";
    }

    if (!checkRequired(logo.value)) {
        valid = false;
        errorLogo.innerText = "Logo line cannot be empty!";
    }

    if (valid && window.location.pathname === "/manufacturer") {
        submit.innerText = "Row was successfuly modified!";
        const popup = closeModifyModalButton.closest('.modify_popup-window');
        closeModal(popup);
    } else if (valid) {
        submit.innerText = "New row was successfuly added!";
    }
}