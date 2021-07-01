const express = require('express');
const router = express.Router();
const {
    deleteTeacher, 
    updateTeacherById, 
    loginTeacherById, 
    registerTeacher, 
    getAllTeacher, 
    getTeacherById
                    } = require('./controller/mainFunctions');

//fetching teachers 
router.get('/', getAllTeacher)

//fetching teachers by id
router.get('/:id', getTeacherById)

//creating teacher
router.post('/register', registerTeacher)

//route for login by id
router.post('/login/:id', loginTeacherById)

//update teacher by id
router.put('/edit/:id', updateTeacherById)

//delete teacher
router.delete('/delete/:id', deleteTeacher)

module.exports = router;