import testYargs from './args';
import testEnquirer from './enquirer';
import R from 'ramda';
import originOptions from './options';

import fillOptionsByArgs, { zipToDic } from './fillOptionsByArgs';
import fillOptionsByQuestions from './fillOptionsByQuestions';

; (async function () {
	let options = R.clone(originOptions);
	fillOptionsByArgs(options);
	await fillOptionsByQuestions(options);

	const optionObj = zipToDic('name', 'value', options);

	console.log('args xx:', optionObj);
})();

// testEnquirer();
// testYargs();