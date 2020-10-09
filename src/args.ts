import yargs from 'yargs';

export default function testYargs() {
	// test1();
	// test2();
	// test3();
	test4();
};

function test4() {
	console.log('------------------test4----------------');
	test();
	return void (0);

	function test() {
		yargs
			.recommendCommands()
			.usage('Usage: create-lib <cmd> [options]') // usage string of application.
			.command(cmd('lib'))
			.command(cmd('app'))
			.command(cmd('demo'))
			.demandCommand()
			.options({
				'package-name': {
					alias: 'p',
					description: 'package name',
					default: 'pn',
					required: true,
					type: 'string',
				},
			})
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
		console.log('args:', args);
	}
}


function test3() {
	console.log('------------------test3----------------');
	test();
	return void (0);

	function test() {
		yargs.options({
			name: {
				alias: 'n',
				describe: 'package name',
				demandOption: true,
			},
			repository: {
				alias: 'r',
				describe: 'repository',
				default: 'xxx.com/repository.git'
			}
		});

		console.log('argv:', yargs.argv);
	}
}


function test2() {
	console.log('------------------test2----------------');
	test();
	return void (0);

	function test() {
		yargs.parse(process.argv.slice(2));
		const argv = yargs.alias('i', 'ingredient')
			.help('help')
			.argv;

		console.log('argv:', argv);
	}
}


function test1() {
	console.log('------------------test1----------------');
	test();
	return void (0);

	function test() {
		console.log('argv:', yargs.argv);
		console.log('parse', yargs.parse());
		console.log('parse:', yargs(['-z', '1', '-y', '2']).argv);
		console.log('parse', yargs.parse(['-x', '1', '-y', '2']));
	}
}
