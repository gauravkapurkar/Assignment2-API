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

/**
 * @swagger
 * /teachers:
 *      get:
 *          summary: fetching teachers
 *          description: get all existing teachers
 *          responses:
 *              '200':
 *                  description: successfully get all teachers
 */
router.get('/', getAllTeacher)

/**
 * @swagger
 * /teachers/{id}:
 *      get:
 *          summary: fetching teachers by id
 *          description: get teacher with requested id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  description: numeric id to retrieve teacher
 *          responses:
 *              '200':
 *                  description: successfully get teacher
 *              '400':
 *                  description: requested teacher not exist
 */
router.get('/:id', getTeacherById)


/**
 * @swagger
 * /teachers/register:
 *      post:
 *          summary: creating teacher
 *          description: create teacher with name & password
 *          parameters:
 *              -   in: body
 *                  name: nameAndPassword
 *                  required: true
 *                  description: enter name & password in json object format            
 *          responses:
 *              '201':
 *                  description: teacher registered successfully
 *              '400':
 *                  description: please enter name & password as per instructions
 *              '500':
 *                  description: server having some issues
 */

router.post('/register', registerTeacher)


/**
 * @swagger
 * /teachers/login/{id}:
 *      post:
 *          summary: teacher login by id
 *          description: teacher login using id, name & password
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  description: numeric id to retrieve teacher
 *              -   in: body
 *                  name: nameAndPassword
 *                  required: true
 *                  description: enter name & password in json object format 
 *          responses:
 *              '200':
 *                  description: successfully logged in
 *              '400':
 *                  description: requested teacher registered
 *              '401':
 *                  description: invalid password
 *              '500': 
 *                  description: server having some issues
 */
router.post('/login/:id', loginTeacherById)


/**
 * @swagger
 * /teachers/update/{id}:
 *      put:
 *          summary: update teacher by id
 *          description: update teacher name & password
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  description: numeric id to retrieve teacher
 *              -   in: body
 *                  name: nameAndPassword
 *                  required: true
 *                  description: enter name & password in json object format 
 *          responses:
 *              '200':
 *                  description: teacher updated successfully 
 *              '400':
 *                  description: enter updated name & password as per instructions
 *              '404':
 *                  description: teacher not found
 *              '500': 
 *                  description: server having some issues
 */
router.put('/update/:id', updateTeacherById)


/**
 * @swagger
 * /teachers/delete/{id}:
 *      delete:
 *          summary: delete teacher
 *          description: delete teacher using id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  description: numeric id to retrieve teacher
 *          responses:
 *              '200':
 *                  description: teacher deleted successfully 
 *              '404':
 *                  description: teacher not found
 */
router.delete('/delete/:id', deleteTeacher)

module.exports = router;