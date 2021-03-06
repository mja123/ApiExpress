const joi = require('joi');

const id = joi.number();
const name = joi.string().min(3).max(30);
const lastName = joi.string().min(3).max(40);
const phone = joi.number().min(10000);
const userId = joi.number();
const user = joi.object();

const customerCreate = joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    user: user,
    userId: userId,

});

const customerFind = joi.object({
    id: id.required(),
});
const customerPatch = joi.object({
    lastName: lastName,
    name: name,
    pthone: phone,
})
const customerPut = joi.object({
    lastName: lastName.required(),
    name: name.required(),
    phone: phone.required(),
});

module.exports = { customerCreate, customerFind, customerPut, customerPatch };