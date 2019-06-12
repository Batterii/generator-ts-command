# @batterii/generator-ts-command
A [yeoman](https://yeoman.io/) generator for creating new commands in Batterii
TypeScript applications.

## Usage
```
  yo @batterii/ts-command [options]

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers             Default: false
        --skip-install   # Do not automatically install dependencies  Default: false
        --force-install  # Fail on install dependencies error         Default: false
  -n,   --name           # Name of the commmand
```

## The Command Name
This generator accepts a `command` option, which will determine the name of the
command it creates. If not provided, the generator will prompt the user for it.
If a command with the provided name already exists in the project, the generator
will abort.

The command name must be dash-separated lowercase. This is not a requirement of
npm, but a useful convention.

## Modifying `package.json`
This generator will modify `package.json` at the root of the project by adding a
new entry to the `bin` field for the new command, as well as a new
`start:${command}` script for easily building and running your command during
development.

Due to this modification of an existing file, Yeoman will ask for confirmation
before proceeding. Simply type `y` and press enter to continue.

## Implementing Your Command
When the generator has finished, a new file will exist at `bin/${command}.ts`.
Implement your command here.
