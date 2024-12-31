import Joi from "joi";

const generalFields = [
    {
        displayName: 'Email',
        name: 'email',
        type: 'email',
        validation: Joi.string()
            .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
            .rule({ message: "Please enter a valid mail" })
            .required(),
        required: true,
    },
    {
        displayName: 'Password',
        name: 'password',
        type: 'password',
        validation: Joi.string()
            .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
            .rule({
                message: "The password must be at least seven characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
            })
            .required(),
        required: true,
    },
];

const signupFields = [
    {
        displayName: 'First Name',
        name: 'first',
        type: 'text',
        validation: Joi.string().min(2).max(256).required(),
        required: true,
    },
    {
        displayName: 'Middle Name',
        name: 'middle',
        type: 'text',
        validation: Joi.string().min(2).max(256).allow(""),
    },
    {
        displayName: 'Last Name',
        name: 'last',
        type: 'text',
        validation: Joi.string().min(2).max(256).required(),
        required: true,
    },
    {
        displayName: 'Phone',
        name: 'phone',
        type: 'text',
        validation: Joi.string()
            .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
            .rule({ message: 'user "phone" must be a valid phone number' })
            .required(),
        required: true,
    },
    ...generalFields,
    {
        displayName: 'State',
        name: 'state',
        type: 'text',
        validation: Joi.string().allow(""),
    },
    {
        displayName: 'Country',
        name: 'country',
        type: 'text',
        validation: Joi.string().min(2).max(256).required(),
        required: true,
    },
    {
        displayName: 'City',
        name: 'city',
        type: 'text',
        validation: Joi.string().min(2).max(256).required(),
        required: true,
    },
    {
        displayName: 'Street',
        name: 'street',
        type: 'text',
        validation: Joi.string().min(2).max(256).required(),
        required: true,
    },
    {
        displayName: 'House Number',
        name: 'houseNumber',
        type: 'number',
        validation: Joi.number().required(),
        required: true,
    },
    {
        displayName: 'Zip',
        name: 'zip',
        type: 'number',
        validation: Joi.number().allow(""),
    },
    {
        displayName: 'Is Business',
        name: 'isBusiness',
        type: 'checkbox',
        validation: Joi.boolean().required(),
    },
];

const constants = { generalFields, signupFields }

export default constants;