// VALIDATION FUNCTION 
const Joi = require('joi');

const sign_up_auth = Joi.object().keys({ // SIGN UP FORM VALIDATION
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().min(4).required()
});


const sign_in_auth = Joi.object().keys({ // SIGN IN FORM VALIDATION
  firstname: Joi.string().required(),
  password: Joi.string().min(4).required(),
  role: Joi.string().required()
});

// GET A SPECIFIC USER 
const find_User = (arrayOfUsers, pwd) => arrayOfUsers.find(user => pwd == user.pwd)


// TIME FUNCTION 
const timeFunction = () => {
  const time = new Date();
  const options = {
    hour: 'numeric', 
    minute: 'numeric'
  }
  const formattedTime = time.toLocaleString('en-US', options);
  return formattedTime
}


module.exports = {
  sign_up_auth,
  sign_in_auth,
  find_User,
  timeFunction
}


