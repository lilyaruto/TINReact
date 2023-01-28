const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Field is required";
                break;
            case "number.base":
                err.message = "Field is required";
                break;
            case "number.positive":
                err.message = "Number must be positive";
                break;
            case "string.pattern.name":
                err.message = "Field must be name and surname";
                break;
            case "date.format":
                err.message = "Field is required";
                break;
            default:
                break;
        }
    });
    return errors;
}

const depSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    man_id: Joi.number()
        .required()
        .error(errMessages),
    adrs_id: Joi.number()
        .required()
        .error(errMessages),
    employeesNumber: Joi.number()
        .positive()
        .required()
        .error(errMessages),
    managerName: Joi.string()
        .pattern(/^[a-zA-Z]+ [a-zA-Z]+$/, 'nameSurname')
        .required()
        .error(errMessages),
    foundationDate: Joi.date()
        .iso()
        .required()
        .error(errMessages),
    info: Joi.string()
        .optional()
        .allow("")
});

module.exports = depSchema;