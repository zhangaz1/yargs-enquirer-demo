import R from 'ramda';
import enquirer from 'enquirer';
import { IOption, IQuestion } from './IOption';

const getRemainingQuestions = R.compose(
	R.map((option: IOption) => {
		let question = R.pick(['name', 'required'])(option) as unknown as IQuestion;
		question.type = option.questionType;
		question.message = option.questionMessage;
		question.initial = option.default;
		return question;
	}),
	R.filter(R.prop('isQuestion'))
);

export default async function fillOptionsByQuestions(options: Array<IOption>) {
	const questions = getRemainingQuestions(options);
	const answers = await enquirer.prompt(questions);
	fillOptionsByDic(answers, options);
}

export function fillOptionsByDic(dic: any, options: Array<IOption>) {
	R.forEach((option: IOption) => {
		const existsInArg = R.hasIn(option.name)(dic);
		if (existsInArg) {
			option.isQuestion = false;
			option.value = dic[option.name];
		}
	})(options);
};
