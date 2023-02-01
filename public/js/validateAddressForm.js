function validateForm() {
    const closeModifyModalButton = document.querySelector('[data-submit-modify-popup]');
    const city = document.getElementsByClassName('add_address-city')[0];
    const street = document.getElementsByClassName('add_address-street')[0];
    const building = document.getElementsByClassName('add_address-building')[0];
    const postcode = document.getElementsByClassName('add_address-postcode')[0];
    
    const errorCity = document.getElementById('city_error');
    const errorStreet = document.getElementById('street_error');
    const errorBuilding = document.getElementById('building_error');
    const errorPostcode = document.getElementById('postcode_error');
    const submit = document.getElementById('address-add-row_submit');

    resetErrors([city, street, building, postcode],
        [errorCity, errorStreet, errorBuilding, errorPostcode], submit);

    let valid = true;

    if (!checkRequired(city.value)) {
        valid = false;
        errorCity.innerText = "City cannot be empty!";
    } else if (!checkTextLengthRange(city.value, 2, 60)){
        valid = false;
        errorCity.innerText = "The field must contain 2-60 characters!";
    }

    if (!checkRequired(street.value)) {
        valid = false;
        errorStreet.innerText = "Street cannot be empty!";
    } else if (!checkTextLengthRange(street.value, 2, 60)){
        valid = false;
        errorStreet.innerText = "The field must contain 2-60 characters!";
    }

    if (!checkRequired(building.value)) {
        valid = false;
        errorBuilding.innerText = "Building cannot be empty!";
    } else if (!checkTextLengthRange(building.value, 2, 10)){
        valid = false;
        errorBuilding.innerText = "The field must contain 2-10 characters!";
    }

    if (!checkRequired(postcode.value)) {
        valid = false;
        errorPostcode.innerText = "Postcode cannot be empty!";
    } else if (!checkTextLengthRange(postcode.value, 2, 10)){
        valid = false;
        errorPostcode.innerText = "The field must contain 2-10 characters!";
    }

    if (valid && window.location.pathname === "/address") {
        submit.innerText = "Row was successfuly modified!";
        const popup = closeModifyModalButton.closest('.modify_popup-window');
        closeModal(popup);
    } else if (valid) {
        submit.innerText = "New row was successfuly added!";
    }
}