const Joi = require('joi'); // used for validation middleware //return from this module is class so name is in uppercase


function validateCourse(teacher){ // to handle redundant code
    const schema = Joi.object({
        // id: Joi.number().required(),
        name: Joi.string().min(3).required(),
        password: Joi.string().min(8).required()
    });
 
    return schema.validate(teacher); //validate returns object with error, value 
}

module.exports = {validateCourse};