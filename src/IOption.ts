export interface IOptionBase {
	name: string;
	required: boolean;
}

export interface IArgs extends IOptionBase {
	alias: Array<string>;
	description: string;
	default: string | boolean | number;
	type: 'string' | 'boolean' | 'number';
}

export interface IOption extends IArgs {
	isQuestion: boolean;
	questionMessage: string;
	questionType: 'input' | 'confirm' | 'numeral';
	value: string | boolean | number | null;
};

export interface IQuestion extends IOptionBase {
	message: string;
	initial: string | boolean | number;
	type: 'input' | 'confirm' | 'numeral';
}