import yargs from 'yargs';

export default function testYargs() {
	test1();
	test2();
	test3();
};

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
