import yargs from 'yargs';
import yargsParser from 'yargs-parser';
import R from 'ramda';
import { IOption } from './IOption';
import { fillOptionsByDic } from './fillOptionsByQuestions';

export default function fillOptionByArgs(options: Array<IOption>) {
	const getOptionsMap = R.indexBy<IOption>(R.prop('name'));
	const checkArgs = R.pipe(getOptionsMap, parseArgs);
	const argv = checkArgs(options);

	fillOptions(options);

	options.push({
		name: 'tpml',
		value: argv.tmpl,
	} as IOption);
}

function fillOptions(options: Array<IOption>) {
	const alias = zipToDic('name', 'alias', options) as { [key: string]: Array<string> };

	const argsStr = process.argv.slice(2);
	const argv = yargsParser(argsStr, { alias });

	fillOptionsByDic(argv, options);
}

export function zipToDic(kk: string, vk: string, list: Array<any>) {
	const name = R.map(R.prop(kk));
	const aliases = R.map(R.prop(vk));
	return R.zipObj(name(list), aliases(list));
}

function parseArgs(optionsMap: { [x: string]: IOption }) {
	return yargs
		.recommendCommands()
		.usage('Usage: create-lib <cmd> [options]') // usage string of application.
		.command(cmd('lib'))
		.command(cmd('app'))
		.command(cmd('demo'))
		.demandCommand()
		.options(optionsMap)
		// show examples of application in action.
		.example('npm create lib -p xxx', 'generate lib template as xxx package')
		// final message to display when successful.
		.epilog('for more information visit https://github.com/chevex/yargs')
		// disable showing help on failures, provide a final message
		// to display for errors.
		.showHelpOnFail(false, 'whoops, something went wrong! run with --help')
		.argv;
}

function cmd(cmd: string) {
	return {
		command: cmd,
		describe: `create ${cmd}`,
		builder: { tmpl: { default: `${cmd}` } },
		handler: runCmd
	};
}

function runCmd(args: any) {
	// console.log('args:', args);
}