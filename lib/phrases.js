var fs = require('fs');

var Phrases = module.exports = {};
var words = {};
var index = [];

//Loads files into memory, prepares hash/cache
Phrases.load = function(file,callback) {
	parsePhrases(file, callback);
};

Phrases.get = function(word) {
	var idx = words[word.toLowerCase()]||[];
	var phs = [];
	for(var i=0;i<idx.length;i++) {
		phs.push(index[idx[i]]);
	}

	if(!phs.length) {
		for(var w in words) {
			if (w.indexOf(word)>-1){
				idx = words[w];
				for(var i=0;i<idx.length;i++) {
					phs.push(index[idx[i]]);
				}				
			}
		}
	}
	return phs;
};

//Loads an phrase list file from disk into memory
function parsePhrases(filename,callback) {

	fs.readFile(filename,'utf8',function(err,raw){
		if (err) { callback(err); return; }
		index = raw.split('\n');
		for(var i=0;i<index.length;i++) {
			var phs = index[i].split('_');
			for(var p=0;p<phs.length;p++) {
				words[phs[p]]=words[phs[p]]||[];
				words[phs[p]].push(i);
			}
		}
		if(callback) callback(null);
	});

};