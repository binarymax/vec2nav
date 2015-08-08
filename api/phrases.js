var ct = require('../controllers/words');
var dt = require('heimdall').datatypes;

module.exports = {
    name: "phrases",
    description: "Gets related words",
    api: {
        COLLECTION:{
            description:"Gets a list of phrases that contains the given word",
            params:{
                word:dt.string("The word to check",true)
            },
            command: ct.GetPhrases
        }  
    }
};