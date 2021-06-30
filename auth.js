const express = require('express');
const app = express();
const Joi = require('joi'); // used for validation middleware //return from this module is class so name is in uppercase
const bcrypt = require('bcrypt');

const teachers = [
    // {name: 'gk', password: 'password'}
];

function validateCourse(course){ // to handle redundant code
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        password: Joi.string().min(8).required()
    });
 
    return schema.validate(course); //validate returns object with error, value 
}

app.use(express.json());// for acceoting json objects
//fetching teachers 
app.get('/teachers', (req, res) => {
    res.status(200).json(teachers);
})

//creating teacher
app.post('/teachers', async (req, res) => {
    const {error, value} = validateCourse(req.body);
    if(error)   return res.status(400).send(error.details[0].message);
    
    try{
        const salt = await bcrypt.genSalt();// generate salt kind of prefix for hashed password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // console.log(`${salt} || ${hashedPassword}`); 

        const newTeacher = {name: req.body.name, password: hashedPassword} // hashedPassword to protect actual password in databases
        teachers.push(newTeacher);
        res.status(200).send(teachers);

    } catch{
        res.status(500).send();
    }
})

//route for login
app.post('/teachers/login', async (req, res) => {
    const teacherLogin = teachers.find(teacher => teacher.name === req.body.name)

    if(!teacherLogin) return res.status(400).send('teacher not registered');

    try {
        const bool = await bcrypt.compare(req.body.password, teacherLogin.password); // comparing original pswd with input pswd
        if (bool) return res.status(200).send('Login successful');
        else return res.status(401).send('Login failed');

    } catch {
        res.status(500).send();
    }
})
app.listen(5000);