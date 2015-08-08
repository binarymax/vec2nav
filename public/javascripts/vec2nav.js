var vec2nav = (function(){
	
	var $word = $("#word");
	var $wordlist = $("#wordlist");

	var $phrase = $("#phrase");
	var $phraselist = $("#phraselist");

	var displayWords = function(data) {
		$wordlist.text(_.pluck(data.d.results,'word'));
	};

	var displayPhrases = function(data) {
		$phraselist.text(_.pluck(data.d.results,'phrase'));
	};
	
	var lookupWord = function(){
		var last = "";
		return function(word) {
			if(word && word !== last) {
				last = word;
				$.get('/words/'+word).done(displayWords);
			}
		}
	}();

	var lookupPhrase = function(){
		var last = "";
		return function(word) {
			if(word && word !== last) {
				last = word;
				$.get('/phrases/'+word).done(displayPhrases);
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
	
	$("#word").on("keyup",timeout(500,function(e){
		lookupWord($word.val());
	}));

	$("#phrase").on("keyup",timeout(500,function(e){
		lookupPhrase($phrase.val());
	}));

	return {
		lookupWord:lookupWord
	};

})();