import Joi from "joi";

export const fields = [
  {
    displayName: 'Title',
    name: 'title',
    type: 'text',
    validation: Joi.string().required(),
    required: true,
  },
  {
    displayName: 'Summary',
    name: 'summary',
    type: 'text',
    validation: Joi.string().required(),
    required: true,
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'textarea',
    validation: Joi.string().min(65).required(),
    required: true,
  },
  {
    displayName: 'Price',
    name: 'price',
    type: 'number',
    validation: Joi.number().required(),
    required: true,
  },
  {
    displayName: 'Image',
    name: 'image',
    type: 'text',
    validation: Joi.string()
      .ruleset.regex(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
      .rule({ message: "Image mast be a valid URL" })
      .allow(""),
  },
];
