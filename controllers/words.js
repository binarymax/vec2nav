var w2v = require('word2vec');
var phs = require('../lib/phrases');
var vec;

w2v.loadModel(process.cwd() + "/data/vectors.bin", function(err, model){ 
	if(err) throw err;
	vec = model; 
});

phs.load(process.cwd() + "/data/phrases.txt", function(err){ 
	if(err) throw err;
});

var Words = module.exports = {};

Words.GetSimilar = function(data,callback) {

	var word = data.word.toLowerCase();

	callback(null,vec.mostSimilar(word,20));

};

Words.GetPhrases = function(data,callback) {

	var word = data.word.toLowerCase();

	var phrases = phs.get(word).map(function(phs){ return {phrase:phs} });

	callback(null,phrases);

};