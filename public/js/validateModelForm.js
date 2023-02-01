function validateForm() {
    const closeModifyModalButton = document.querySelector('[data-submit-modify-popup]');
    const name = document.getElementsByClassName('add_model-name')[0];
    const manufacturer = document.getElementById('add_manufacurer');
    const generation = document.getElementsByClassName('add_model-generation')[0];

    const errorName = document.getElementById('name_error');
    const errorManufacturer = document.getElementById('manufacturer-id_error');
    const errorGeneration = document.getElementById('generation_error');
    const submit = document.getElementById('model-add-row_submit');

    resetErrors([name, manufacturer, generation], [errorName, errorManufacturer, errorGeneration], submit);

    let valid = true;

    if (!checkRequired(name.value)) {
        valid = false;
        errorName.innerText = "Name cannot be empty!";
    } else if (!checkTextLengthRange(name.value, 2, 60)) {
        valid = false;
        errorName.innerText = "The field must contain 2-60 characters!";
    }

    if (!checkSelect(manufacturer.value)) {
        valid = false;
        errorManufacturer.innerText = "Please choose manufacturer!";
    }

    console.log(generation.value);
    if (!checkRequired(generation.value)) {
        valid = false;
        errorGeneration.innerText = "Name cannot be empty!";
    } else if (!checkRequiredNumber(generation.value)) {
        valid = false;
        errorGeneration.innerText = "The field cannot be 0 or negative number!";
    }

    if (valid && window.location.pathname === "/model") {
        submit.innerText = "Row was successfuly modified!";
        const popup = closeModifyModalButton.closest('.modify_popup-window');
        closeModal(popup);
    } else if (valid) {
        submit.innerText = "New row was successfuly added!";
    }
}