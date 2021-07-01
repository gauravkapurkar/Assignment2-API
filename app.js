const express = require('express');
const app = express();
 
const teacherRoute = require('./teacher'); 

app.use(express.json());// for accepting json objects

app.use('/teachers', teacherRoute);

app.listen(5000);