const express = require('express');
const app = express();
const teacherRoute = require('./teacher'); 

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: 'Teacher API',
            description: 'API for teacher registration, login, updation, deletion',
            version: '1.0.0',
            contact:{
                name:'Gaurav Kapurkar'
            },
            servers: [{
                url:"http://localhost:5000/",
                description:'local dev server'
            }]
        }
    },
    apis: ["./teacher.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));

app.use(express.json());// for accepting json objects

app.use('/teachers', teacherRoute);

app.listen(5000);