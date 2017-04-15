function request() {
	var word = $('input').val();

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

function onSuccess(data) {
	alert(transleite(data.pronunciation.all));
}

function onError(jqXHR, textStatus) {
		alert("Algo deu errado");
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
