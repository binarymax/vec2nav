var templates = (function(){

	var compiled = {};

	_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

	$("script[type=template]").each(function(){
		var tmpl = $(this);
		compiled[tmpl.attr("data-name")] = _.template(tmpl.html());
	});

	var parse = function(template,data) {
		return compiled[template](data);
	}

	return {
		parse:parse,
		group:_.curry(parse)
	}


})();

var vec2nav = (function(){
	
	var $word = $("#word");
	var $wordlist = $("#wordlist");
	var $phraselist = $("#phraselist");

	var display = function(type,word,data) {
		if (!(data.d && data.d.results && data.d.results.length)) return;
		var $group = $(templates.parse("word-list",{word:word}));
		$("#"+type).append($group);
		$group.children(".list").append(data.d.results.map(templates.group(type)));
	};


	var lookup = function(resource){
		var last = "";
		var method = _.curry(display)(resource);
		return function(word) {
			if(word && word !== last) {
				last = word;
				$.get("/"+resource+"/"+word).done(method(word));
			}
		}
	}

	var timeout = function(delay,callback) {
		var id;
		return function() {
			var self = this;
			var args = Array.prototype.slice.call(arguments);
			clearTimeout(id);
			id = setTimeout(function(){
				callback.apply(self,args);
			},delay);
		}
	}

	var lookupWord   = lookup("words");
	var lookupPhrase = lookup("phrases");
	
	$word.on("keyup",timeout(500,function(e){
		lookupWord($word.val());
		lookupPhrase($word.val());
	}));

	$("#lists").on("click",".word",function(e){
		var word = $(this).attr("data-value");
		$word.val(word);
		lookupWord(word);
		lookupPhrase(word);
	});

	return {
		lookupWord:lookupWord
	};

})();