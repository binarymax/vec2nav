var pty      = require("pty");
var emitter  = require("events").EventEmitter;
var events   = new emitter();
var w2v;

var li = "Enter word or sentence (EXIT to break):";
var wd = /Word\: ([\w]+)/;
var ln = /Word\:([^\n]+)/;
var l1 = "                                              Word       Cosine distance";
var l2 = "------------------------------------------------------------------------";
var r  = /\r+/;
var s  = /\s+/;

var engaged = false;

var data = "";
var read = function(chunk) {
	data+=chunk;
	if (data.indexOf(li)>-1) {
		var word;
		var words = [];
		var match = data.match(wd);
		var lines = data.replace(li,'').replace(ln,'').replace(l1,'').replace(l2,'').replace(r,'').split('\n');
		if (match) word = match[1];
		for(var i=0;i<lines.length;i++) {
			var val = lines[i];
			if (val.substr(0,2)=='  ') {
				val = val.split(s);
				words.push({word:val[1],dist:val[2]});
			}
		}
		if (word) events.emit(word,null,words);
		data="";
	}
};

var Distance = module.exports = {};

Distance.load = function(prog,file,callback) {
	var err = null;
	try {
		//prog is the path to the the dictance program
		//file is the path to the the vector.bin file
		w2v = pty.spawn(prog, [file]);
		w2v.on('data',read);
	} catch(ex) {
		err = ex;
	}
	if (callback) callback(err);
};

Distance.get = function(word,callback) {

	if(engaged) {
		setImmediate(function(){
			Distance.get(word,callback);
		});
	} else {
		events.once(word,function(err,data){
			engaged = false;
			callback(err,data);
		});
		engaged = true;
		w2v.write(word + '\n');
	}

};