const {readFileSync} = require('fs');
const { writingData } = require('./file_db_storage/dataWriting');
const basePath = '/home/gaurav/JS/api_creation'
const data = readFileSync(`${basePath}/data/teachers.json`);
const loadTeacher = JSON.parse(data);
// console.log(loadTeacher);
const {validateCourse} = require('./utils/validation');
const {getHashPassword, comparePassword} = require('./utils/passwordHashed');


const getAllTeacher = (req, res) => {
    res.status(200).json(loadTeacher);
}

const getTeacherById = (req, res) => {
    const teacherId = loadTeacher.find(teacher => teacher.id === Number(req.params.id));
    if(!teacherId) return res.status(400).send(`teacher with id: ${req.params.id} not found`);
    res.status(200).json(teacherId);
}

const registerTeacher = (req, res) => {
    const {error, value} = validateCourse(req.body);
    if(error)   return res.status(400).send(error.details[0].message);
    
    try{
        const hashedPassword = getHashPassword(req.body.password);
        const newTeacher = {id: loadTeacher.length+1, name: req.body.name, password: hashedPassword} // hashedPassword to protect actual password in databases
        
        loadTeacher.push(newTeacher);
        writingData(loadTeacher);
        res.status(201).send(loadTeacher);

    } catch{
        res.status(500).send();
    }
}

const loginTeacherById = (req, res) => {
    const teacherLogin = loadTeacher.find(teacher => {
        return (teacher.name === req.body.name && teacher.id === Number(req.params.id))
    });

    if(!teacherLogin) return res.status(400).send('teacher not registered');

    try {
        const bool = comparePassword(req.body.password, teacherLogin.password);
        if (bool) return res.status(200).send('Login successful');
        else return res.status(401).send('Login failed');

    } catch {
        res.status(500).send();
    }
}

const updateTeacherById = (req, res)=>{
    const teacher = loadTeacher.find(c => c.id === Number(req.params.id))
    if(!teacher) return res.status(404).send(`teacher with id:${req.params.id} not found`);

    const {error, value} = validateCourse(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }   
    try{
        const hashedPassword = getHashPassword(req.body.password);
        teacher.name = req.body.name;
        teacher.password = hashedPassword;
        // loadTeacher.push(newTeacher);
        writingData(loadTeacher);
        res.status(200).send(loadTeacher); 
    } catch {
        res.status(500).send();
    }
}

const deleteTeacher = (req,res)=>{
    const teacher = loadTeacher.find(c => c.id === Number(req.params.id))
    if(!teacher) return res.status(404).send(`teacher with id:${req.params.id} not found`);

    const index = loadTeacher.indexOf(teacher);
    loadTeacher.splice(index, 1);
    writingData(loadTeacher);
    res.status(200).send(loadTeacher);
}

module.exports = {deleteTeacher, updateTeacherById, loginTeacherById, registerTeacher, getAllTeacher, getTeacherById};