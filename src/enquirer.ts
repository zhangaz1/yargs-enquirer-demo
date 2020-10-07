import enquirer from 'enquirer';

export default async function () {
	console.log('test enquirer', enquirer);
	const input: any = await enquirer.prompt([{
		type: 'input',
		name: 'name',
		message: 'What is the package name?',
		required: true,
		initial: 'pkg',
	}, {
		type: 'input',
		name: 'repository',
		message: 'where the repository?',
	}]);

	console.log(`input: ${JSON.stringify(input)}`);
}