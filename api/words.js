var ct = require('../controllers/words');
var dt = require('heimdall').datatypes;

module.exports = {
    name: "words",
    description: "Gets related words",
    api: {
        COLLECTION:{
            description:"Gets a list of similar words",
            params:{
                word:dt.string("The word to check",true)
            },
            command: ct.GetSimilar
        }  
    }
};