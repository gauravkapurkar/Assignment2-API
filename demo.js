const express = require('express');
const app = express();
const Joi = require('joi'); // used for validation middleware //return from this module is class so name is in uppercase

app.use(express.json());//for parsing json object in body

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
]
function validateCourse(course){ // to handle redundant code
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
 
    return schema.validate(course); //validate returns object with error, value 
}

app.delete('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === Number(req.params.id))
    if(!course) return res.status(404).send(`course with id:${req.params.id} not found`);

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(courses);
})

app.put('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === Number(req.params.id))
    if(!course) return res.status(404).send(`course with id:${req.params.id} not found`);

    const {error, value} = validateCourse(req.body);
    
    if(error){
        return res.status(400).send(error.details[0].message);
        
    }   
    course.name = req.body.name;
    res.status(200).send(courses); 
})

app.post('/api/courses', (req, res) => {
    // if(!req.body.name || req.body.name.length < 3){
    //     res.status(400).send('please input name with at least 3 letters');
    //     return;
    // }

    const {error, value} = validateCourse(req.body);
    
    if(error)   return res.status(400).send(error.details[0].message);
    
    const course = {
    id:courses.length+1,
    name: req.body.name
    }
    courses.push(course);
    res.status(200).send(courses);
    

})

app.get('/api/courses', (req, res) => {
    res.send(courses);

})

app.get('/api/courses/:id', (req, res) => {
    // res.send(req.params);
    // res.send(req.query);
    const course = courses.find(c => c.id === Number(req.params.id))
    if(!course) return res.status(404).send(`course with id:${req.params.id} not found`);
    res.status(200).send(course);

})

app.listen(5000, () => console.log('on port 5000'))