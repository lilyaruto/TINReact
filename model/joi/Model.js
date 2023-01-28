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
            case "string.min":
                err.message = `The field should contain at least ${err.local.limit} characters`;
                break;
            case "string.max":
                err.message = `The field should contain at most ${err.local.limit} characters`;
                break;
            case "number.min":
                err.message = `The field should be 1 or more`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const modSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    name: Joi.string()
        .required()
        .min(1)
        .max(60)
        .error(errMessages),
    man_id: Joi.number()
        .optional(),
    generation: Joi.number()
        .min(1)
        .required()
        .error(errMessages)
});

module.exports = modSchema;