// hotels api request validation
import Joi from 'joi';
export default {
    get: {
        params: Joi.object().keys({
            id: Joi.string().length(4)
        }).required(),
    },
    create: {
        body: Joi.object().keys({
            id: Joi.string().length(4),
            name: Joi.string().required(),
            countryCode: Joi.string().length(2),
            score: Joi.number().min(0).max(100)
        }).required(),
    },
    update: {
        params: Joi.object().keys({
            id: Joi.string().length(4),
        }).required(),
        body: Joi.object().keys({
            countryCode: Joi.string().length(2),
            name: Joi.string(),
            score: Joi.number().min(0).max(100)
        })
    },
    delete: {
        params: Joi.object().keys({
            id: Joi.string().length(4)
        }).required()
    },
};