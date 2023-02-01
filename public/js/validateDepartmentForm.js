function validateForm() {
    const closeModifyModalButton = document.querySelector('[data-submit-modify-popup]');
    const manufacturer = document.getElementById('add_department-manufacturer');
    const address = document.getElementById('add_department-address');
    const employeesNumber = document.getElementsByClassName('add_department-employees-number')[0];
    const managerName = document.getElementsByClassName('add_department-manager-name')[0];
    const foundationDate = document.getElementsByClassName('add_department-foundation-date')[0];

    const errorManufacturer = document.getElementById('manufacturer_error');
    const errorAddress = document.getElementById('address_error');
    const errorEmployeesNumber = document.getElementById('employees-number_error');
    const errorManagerName = document.getElementById('manager-name_error');
    const errorFoundationDate = document.getElementById('foundation-date_error');
    const submit = document.getElementById('department-add-row_submit');

    resetErrors([manufacturer, address, employeesNumber, managerName, foundationDate],
        [errorManufacturer, errorAddress, errorEmployeesNumber, errorManagerName, errorFoundationDate], submit);

    let valid = true;

    if (!checkSelect(manufacturer.value)) {
        valid = false;
        errorManufacturer.innerText = "Please choose manufacturer!";
    }

    if (!checkSelect(address.value)) {
        valid = false;
        errorAddress.innerText = "Please choose address!";
    }

    if (!checkRequired(employeesNumber.value)) {
        valid = false;
        errorEmployeesNumber.innerText = "Employees number field cannot be empty!";
    } else if (!checkRequiredNumber(employeesNumber.value)) {
        valid = false;
        errorEmployeesNumber.innerText = "The field cannot be 0 or negative number!";
    }

    if (!checkRequired(managerName.value)) {
        valid = false;
        errorManagerName.innerText = "Name and surname cannot be empty!";
    } else if (!checkNameSurname(managerName.value)) {
        valid = false;
        errorManagerName.innerText = "The field must contain name and surname!";
    }

    if (!checkRequired(foundationDate.value)) {
        valid = false;
        errorFoundationDate.innerText = "Date field cannot be empty!";
    }

    if (valid && window.location.pathname === "/department") {
        submit.innerText = "Row was successfuly modified!";
        const popup = closeModifyModalButton.closest('.modify_popup-window');
        closeModal(popup);
    } else if (valid) {
        submit.innerText = "New row was successfuly added!";
    }
}