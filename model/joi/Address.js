const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Field is required";
                break;
            case "string.min":
                err.message = `The field should contain at least ${err.local.limit} characters`;
                break;
            case "string.max":
                err.message = `The field should contain at most ${err.local.limit} characters`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const adrSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    city: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    street: Joi.string()
        .min(2)
        .max(100)
        .required()
        .error(errMessages),
    building: Joi.string()
        .min(1)
        .max(10)
        .required()
        .error(errMessages),
    index: Joi.string()
        .min(1)
        .max(10)
        .required()
        .error(errMessages),
});

module.exports = adrSchema;