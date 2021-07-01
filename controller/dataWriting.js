const {writeFile} = require('fs');

function writingData(object) {
    writeFile('./teachers.json', JSON.stringify(object), err => {  
        if (err) throw err;
        console.log('teachers saved...');
    })
}

module.exports = {writingData};