var templates = (function(){

	var compiled = {};

	var parse = function(template,data) {
		return compiled[template](data);
	}

	_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

	$("script[type=template]").each(function(){
		var tmpl = $(this);
		compiled[tmpl.attr("data-name")] = _.template(tmpl.html());
	});

	return {
		parse:parse,
		group:_.curry(parse)
	}


})();

var vec2nav = (function(){
	
	var $word = $("#word");
	var $wordlist = $("#wordlist");
	var $phraselist = $("#phraselist");

	var displayWords = function(data) {
		$wordlist.children().remove()
		$wordlist.append(data.d.results.map(templates.group("word")));
	};

	var displayPhrases = function(data) {
		$phraselist.children().remove();
		$phraselist.append(data.d.results.map(templates.group("phrase")));
	};
	
	var lookupWord = function(){
		var last = "";
		return function(word) {
			if(word && word !== last) {
				last = word;
				$.get("/words/"+word).done(displayWords);
			}
		}
	}();

	var lookupPhrase = function(){
		var last = "";
		return function(word) {
			if(word && word !== last) {
				last = word;
				$.get("/phrases/"+word).done(displayPhrases);
			}
		}
	}();

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
	
	$word.on("keyup",timeout(500,function(e){
		lookupWord($word.val());
		lookupPhrase($word.val());
	}));

	$(".list").on("click",".word",function(e){
		var word = $(this).attr("data-value");
		$word.val(word);
		lookupWord(word);
		lookupPhrase(word);
	});

	return {
		lookupWord:lookupWord
	};

})();