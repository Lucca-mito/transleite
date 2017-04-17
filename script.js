function showLoader() {
	$('#result').html('<div class=loader></div>');
}

function MURICAH() {
	return $('#accent').text() == '🇺🇸';
}

function toggleAccent() {
	if (MURICAH()) $('#accent').text('🇬🇧');
	else $('#accent').text('🇺🇸');
}

function transleite(ipa) {
	var chart = MURICAH() ? chartUS : chartUK;

	// Because .replace() only removes the first ocurrence
	for (var i in chart) ipa = ipa.split(i).join(chart[i]);

	if (ipa[0] == "-") ipa = ipa.substr(1);

	return ipa;
}

function request() {
	var word = $('input').val();
	showLoader();

	if (MURICAH()) $.ajax( // US accent with WordsAPI
		'https://wordsapiv1.p.mashape.com/words/'+word,
		{ // <settings>
			headers: {
				"X-Mashape-Key": "y4yiFb5hiimshOtLWnLenJh6uNunp1M9OJpjsnEp17XCjIu8Kl",
				"Accept": "application/json"
			},
			success: onSuccessUS,
			error: onError
		} // </settings>
	);
	else $.ajax( // UK accent with Yandex
		'https://dictionary.yandex.net/api/v1/dicservice.json/lookup',
		{ //<settings>
			data: {
				key: 'dict.1.1.20160525T021329Z.baec1a754da78aeb.1348bc386523323a7c54ba25e13951734a211b83',
				text: word,
				lang: 'en-en'
			},
			success: onSuccessUK,
			error: onError // Doesn't actually do anything; see onSuccessUK()
		} // </settings>
	);
}

function showResult(data, isSuccess) {
	var text;
	if (isSuccess) text = data +' → '+ transleite(data);
	else text = '<strong>Erro:</strong> A palavra "' +data+ '" não foi encontrada.'

	var bsAlert = $('<div/>') // Bootstrap alert
		.addClass('alert alert-dismissable fade in animate-bottom')
		.addClass(isSuccess ? 'alert-success' : 'alert-danger')
		.html('<a href="#" class="close" data-dismiss="alert">&times;</a>'+text)

	$('#result').html('').append(bsAlert);;
}

function onSuccessUS(data) {
	data = data.pronunciation.all || data.pronunciation;
	if (data) showResult(data, true);
	else onError(); // WordsAPI has to be the least consistent API in history
}

function onSuccessUK(data) {
	data = data.def[0];
	if (data) showResult(data.ts, true);
	else onError(); // Yandex ALWAYS returns a 200, because russians can't HTTP
}

function onError() {
	showResult($('input').val(), false);
}

$(document).ready(function() {
	$('#accent').click(toggleAccent);
	$('button').click(request);
})
