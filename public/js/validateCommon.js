function resetErrors(inputs, errorTexts, submit) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].parentElement.getElementsByClassName("error_msg")[0] = "";
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    submit.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkRequiredNumber(value) {
    if (!value) {
        return false;
    }
    if (parseInt(value) <= 0) {
        return false
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

function checkSelect(value) {
    if (!value) {
        return false;
    }
    if (value === '0') {
        return false;
    }
    return true;
}

function checkNameSurname(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return regName.test(value);
}