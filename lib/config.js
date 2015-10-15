var vec = "vector=";
var phs = "phrase=";

//Defaults:
GLOBAL.vec2nav = {
	distance:(process.cwd() + "/lib/distance"),
	vectors:(process.cwd() + "/data/vectors.bin"),
	phrases:(process.cwd() + "/data/phrases.txt")
};

//Command-line overrides:
process.argv.forEach(function(val) {
	if(val.indexOf(vec)===0) {
		GLOBAL.vec2nav.vectors = val.substr(vec.length);
	}
	if(val.indexOf(phs)===0) {
		GLOBAL.vec2nav.phrases = val.substr(phs.length);
	}
});