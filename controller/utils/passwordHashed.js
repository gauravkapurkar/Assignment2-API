const bcrypt = require('bcrypt');


function  getHashPassword(object){
        const salt =  bcrypt.genSaltSync();// generate salt kind of prefix for hashed password
        const hashedPassword =  bcrypt.hashSync(object, salt);
        // console.log(`${salt} || ${hashedPassword}`); 
        return hashedPassword;
}

function comparePassword(userInputPassword, originalPassword){
        const bool = bcrypt.compareSync(userInputPassword, originalPassword);  // comparing original pswd with input pswd
        return bool;
}
module.exports = {getHashPassword, comparePassword};