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
            case "string.uri":
                err.message = "The field must be a link";
                break;
            default:
                break;
        }
    });
    return errors;
}

const manSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    name: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    parentCompany: Joi.number()
        .optional(),
    logo: Joi.string()
        .uri()
        .max(300)
        .required()
        .error(errMessages)
});

module.exports = manSchema;