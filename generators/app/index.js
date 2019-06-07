const { assign, isString } = require('lodash');
const { Generator } = require('@batterii/yeoman-helpers');

class CommandGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('command', {
			description: 'Command to create in package bin entry',
			type: String,
		});
	}

	async promptForOptions() {
		assign(this.options, await this.prompt([
			{
				when: () => !this.options.command,
				type: 'input',
				name: 'command',
				message: 'Enter the command name',
				validate: (input) => Boolean(input),
			},
		]));
	}

	addCommand() {
		const { command } = this.options;

		// Copy the new command source file to the bin directory.
		this.copyTemplate('command.ts', `bin/${command}.ts`);

		// Create a customizer function to prevent overwriting of
		// previously-existing commands.
		const overwriteCheck = (obj) => {
			if (isString(obj)) {
				this.env.error(`Command '${command}' already exists.`);
			}
		};

		// Add bin entry for the new command in package.json.
		this.extendPackage({
			bin: { [command]: `dist/bin/${command}.js` },
		}, overwriteCheck);

		// Add a start script for the new command.
		this.addScripts({
			[`start:${command}`]: `npm run build && bin/${command}.js`,
		}, overwriteCheck);
	}
}

module.exports = CommandGenerator;
