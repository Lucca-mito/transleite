function request() {
	var word = $('input').val();
	showLoader();

	$.ajax(
		'https://wordsapiv1.p.mashape.com/words/'+word,
		{ // <settings>
			headers: {
				"X-Mashape-Key": "y4yiFb5hiimshOtLWnLenJh6uNunp1M9OJpjsnEp17XCjIu8Kl",
				"Accept": "application/json"
			},
			success: onSuccess,
			error: onError
		} // </settings>
	);
}

function showLoader() {
	$('#result').html('<div class=loader></div>');
}

function onSuccess(data) {
	$('#result').html(
		'<div class="alert alert-success alert-dismissable fade in animate-bottom">\
			<a href="#" class="close" data-dismiss="alert">&times;</a>'+
			transleite(data.pronunciation.all) +'\
		</div>'
	);
}

function onError(jqXHR, textStatus) {
	var word = $('input').val();
	$('#result').html(
		'<div class="alert alert-danger alert-dismissable fade in animate-bottom">\
			<a href="#" class="close" data-dismiss="alert">&times;</a>\
			<strong>Erro:</strong> A palavra "' + word + '"\
			não foi encontrada.\
		</div>'
	);
}

function transleite(ipa) {
	var chart = {
		'_': ' ',
		"'": '-',
		',': ' ',
		'ɑ': 'ó',
		'ɑ': 'ó',
		'æ': 'é',
		'ɛ': 'é',
		'ɪ': 'i',
		'ɔ': 'ó',
		'ʊ': 'u',
		'ju': 'iú',
		'j': 'i',
		'ɜ': 'â',
		'ə': 'a',
		'ð': 'd',
		'ʒ': 'j',
		'hw': 'w',
		'ŋ': 'ng',
		'θ': 'th', // FIXME: italics?
		'r': 'Я',
		'x': 'rr',
		'tʃ': 'tch',
		'ʃ': 'x'
	};

	if (ipa[0] == "'") ipa = ipa.substr(1);

	// Because .replace() only removes the first ocurrence
	for (var i in chart) ipa = ipa.split(i).join(chart[i]);

	return ipa;
}

$(document).ready(function() {
	$('button').click(request);
})
