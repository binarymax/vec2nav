var w2v = require('word2vec-native');
var phs = require('../lib/phrases');

w2v.open(GLOBAL.vec2nav.vectors, function(err,data){ 
	if(err) throw err;
	console.log(" └──  Vectors loaded ("+data.words+" words)");
});

phs.load(GLOBAL.vec2nav.phrases, function(err){ 
	if(err) throw err;
	console.log(" └──  Phrases loaded");
});

var Words = module.exports = {};

Words.GetSimilar = function(data,callback) {

	var word = data.word.toLowerCase();

	var words = w2v.get(word).words;

	callback(null,words);

};

Words.GetPhrases = function(data,callback) {

	var word = data.word.toLowerCase();

	var phrases = phs.get(word).map(function(phs){ return {phrase:phs} });

	callback(null,phrases);

};