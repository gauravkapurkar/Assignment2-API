const {writeFile} = require('fs');
const basePath = '/home/gaurav/JS/api_creation'

function writingData(object) {
    writeFile(`${basePath}/data/teachers.json`, JSON.stringify(object), err => {  
        if (err) throw err;
        console.log('teachers saved...');
    })
}

module.exports = {writingData};