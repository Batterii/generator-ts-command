const { Generator } = require('@batterii/yeoman-helpers');
const { isString } = require('lodash');
const { validateCommandName } = require('@batterii/yeoman-validators');

class CommandGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.optionPrompt({
			type: 'input',
			name: 'name',
			alias: 'n',
			description: 'Name of the commmand',
			message: 'Enter the command name.',
			validate: validateCommandName,
		});
	}

	addCommand() {
		// Get the command name from options.
		const { name } = this.options;

		// Copy the new command source file to the bin directory.
		this.copyTemplate('command.ts', `bin/${name}.ts`);

		// Create a customizer function to prevent overwriting of
		// previously-existing commands.
		const overwriteCheck = (obj) => {
			if (isString(obj)) {
				this.env.error(`Command '${name}' already exists.`);
			}
		};

		// Add bin entry for the new command in package.json.
		this.extendPackage({
			bin: { [name]: `dist/bin/${name}.js` },
		}, overwriteCheck);

		// Add a start script for the new command.
		this.addScripts({
			[`start:${name}`]: `npm run build && dist/bin/${name}.js`,
		}, overwriteCheck);
	}
}

module.exports = CommandGenerator;
