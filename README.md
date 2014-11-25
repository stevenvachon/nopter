# nopter [![NPM Version](http://badge.fury.io/js/nopter.svg)](http://badge.fury.io/js/nopter) [![Build Status](https://secure.travis-ci.org/stevenvachon/nopter.svg)](http://travis-ci.org/stevenvachon/nopter) [![Build status](https://ci.appveyor.com/api/projects/status/hcw1rfsfb6ph2hhc)](https://ci.appveyor.com/project/stevenvachon/nopter) [![Dependency Status](https://david-dm.org/stevenvachon/nopter.svg)](https://david-dm.org/stevenvachon/nopter)

> A powerful, yet simple command line (CLI) option parser for Node.js

Built on [nopt](https://www.npmjs.org/package/nopt), NPM's option parser, this library extends functionality for a faster, clearer and more powerful workflow.

Features:
* Fast & easy declarative API ([example](#example))
* Argument aliases, default values, renamable options and more
* Customizable help screen:

![Help screen](https://raw.github.com/stevenvachon/nopter/master/misc/help-screen.png)

## Getting Started

This utility requires [Node.js](http://nodejs.org/) `~0.10`. To install, type this at the command line:
```shell
npm install nopter --save-dev
```

### Methods

#### config(object)
Gets or sets the [configuration](#Configuration).

* `object` [optional].

#### config.merge(object)
Merges a new [configuration](#Configuration) with the existing one.

* `object` [optional].

#### error.fatal(error, additional, prefix)
Gets a (red) colored error message with a default `"Error"` prefix, but does not display/log it.

* `error` can be an `Error` or `String`. If an `Error`, `error.name` will override the default prefix.
* `additional` [optional] is a second, uncolored `String` sentence.
* `prefix` [optional] overrides the default prefix.

#### error.notice(error, additional, prefix)
Gets an uncolored error message with a default `"Notice"` prefix, but does not display/log it.
See [error.fatal](#errorfatal) for arguments info.

#### error.warn(error, additional, prefix)
Gets a (yellow) colored error message with a default `"Warning"` prefix, but does not display/log it.
See [error.fatal](#errorfatal) for arguments info.

#### help()
Gets the help screen, but does not display/log it.

#### help.indent()
Gets the indent value for custom additions to the help screen.

#### input(args, slice)
Gets user input parsed by nopt.
```js
nopter.input();
nopter.input(process.argv, 2);	// same as above

nopter.input("app --option value", 1);
nopter.input(["--option","value"]);
```
* `args` [optional] can be an `Array` or `String`. Default value is `process.argv`.
* `slice` [optional] is a `Number`. [See nopt docs](https://www.npmjs.org/package/nopt#slicing). Unlike nopt, the default value of `2` only applies when `args===process.argv`; otherwise the default value is `0`.

#### util.forceColors(value)
Forces colors in situations where they would normally be disabled such as a [`child_process`](http://nodejs.org/api/child_process.html) and some CI (Continuous Integration) systems.
* `value` [optional] is a `Boolean`. The default value is `false`.

#### util.readHelpFile(filepath)
Synchronously reads the contents of a text file and converts to LF line endings for cross-platform support. Useful in testing the output of [`help()`](#help).
```js
console.log( nopter.util.readHelpFile("path/to/file.txt") );
//-> This is a text file.
```
* `filepath` is a required `String` path, relative to the current module (like [`require("./")`](http://nodejs.org/api/globals.html#globals_require)).

#### util.replaceColorVars(str)
Replace easy-to-read variables in a `String` with their ANSI counterparts. Useful in testing the output of [`help()`](#help).
```js
var str = "{{green}}This is a {{bold}}colored{{/bold}} sentence.{{/green}}";
console.log( nopter.util.replaceColorVars(str) );
//-> \u001b[32mThis is a \u001b[1mcolored\u001b[22m sentence.\u001b[39m
```
* `str` is a required `String`. Possible [color variables](https://www.npmjs.org/package/colors).

#### util.stripColors(str)
Remove all ANSI characters. Useful in testing the output of [`help()`](#help).
```js
var str = "\u001b[32mThis is a \u001b[1mcolored\u001b[22m sentence.\u001b[39m";
console.log( nopter.util.stripColors(str) );
//-> This is a colored sentence.
```
* `str` is a required `String`.

### Configuration

#### config.colors
Type: `Array`  
Default value: `["red","green","magenta"]`  
The colors used in the help screen. Possible [color values](https://www.npmjs.org/package/colors), `[null,…]` to disable a color and `null` to disable all colors.

#### config.description
Type: `String`  
Default value: `""`  
The app description.

#### config.name
Type: `String`  
Default value: `"noname"`  
The app name used in the command line.

#### config.title
Type: `String`  
Default value: `config.name.toUpperCase()`  
The app title, which is sometimes slightly different from `config.name`.

#### config.version
Type: `String`  
Default value: `"0.0.0"`  
The app version.

#### config.options
Type: `Object`  
Default value: `{}`  
The command line options.
```js
options: {
	"option-name": {
		short: "o",
		info: "Description of option.",
		type: String
	}
}
```
* `option.default` is optional and can be anything. Undefined options are simply `undefined`.
* `option.hidden` is an optional `Boolean` that hides the option from the help screen.
* `option.info` is required and should be a `String`.
* `option.rename` is an optional `String` that renames the option for easier programmatic use.
* `option.short` is optional and can be a `String` or an `Array`.
* `option.sort` is an optional `String` for categorizing the help screen.
* `option.type` is required and can be any of [these types](https://www.npmjs.org/package/nopt#types).

#### config.aliases
Type: `Array`  
Default value: `[]`  
Argument shortcuts to options.
```js
aliases: ["option1","option2"]
```
This would allow something like `app foo bar` to be a CLI shortcut to `app --option1 foo --option2 bar`.

### Example
```js
var app    = require("./app.js");
var nopter = require("nopter");
var path   = require("path");

nopter = new nopter();
nopter.config({
	title: "Test App",
	name: "testapp",
	description: "Testing nopter.",
	version: "1.0.0",
	options: {
		"help": {
			short: ["h","?"],
			info: "Display this help text.",
			type: Boolean
		},
		"input": {
			info: "Some input files.",
			type: [Array,path]
		},
		"output": {
			info: "Some output file.",
			type: path
		},
		"quality": {
			info: "Some compression (0–100, default=80).",
			type: Number,
			default: 80
		},
		"special-cli": {
			rename: "specialCLI",
			short: "s",
			info: "Do something special.",
			type: String,
			hidden: true
		}
	},
	aliases: ["input", "output"]
});

function cli() {
	var args = nopter.input();
	if (args.help) {
		console.log( nopter.help() );
	} else if (args.input && args.output) {
		app(args);
	} else {
		console.error( nopter.error.fatal("You must specify input and output","Use --help") );
	}
}

module.exports = cli;
```
For more ideas, check out the [test file](https://github.com/stevenvachon/nopter/tree/master/test/meta/cli.js).

### Testing
Testing in a child process is slow and can be annoying. Here's an alternative that extends the above example:
```js
// app-cli.js ::::::::::::::::::::

var nopter = require("nopter");

function cli() {
	this.nopter = new nopter();
	this.nopter.config({/* See above example */});
}

cli.prototype.input = function(args, showArgs) {
	var testing = !!args;
	args = this.nopter.input(args);
	if (testing && showArgs) {
		return args;
	} else if (args.help) {
		if (testing) return this.nopter.help();
		else console.log( this.nopter.help() );
	} else if (args.input && args.output) {
		app(args);
	} else {
		console.error( this.nopter.error.fatal("You must specify input and output","Use --help") );
	}
};

module.exports = cli;

// test.js ::::::::::::::::::::

var cli = new (require("./app-cli.js"))();
var nopter = require("nopter");

nopter.util.forceColors(true);

var options = cli.input("--input file1 --output file2", true);
assert.equal(options.input, "file1");
assert.deepEqual(options, {input:"file1", output:"file2"});

var helpScreen = nopter.util.readHelpFile("./help.txt");
helpScreen = nopter.util.replaceColorVars(helpScreen);
assert.equal( cli.input("--help"), helpScreen );
```

## Roadmap Features
* add ~~"safe colors",~~ cell-span and word-wrap features to cli-table
* add "before" and "after" (table?) content for `help()`
* add `option.alias` shortcut:
```js
"option": {
	alias: "--option1 value -xyz"
}
```
* add `config.commands` for nested options:
```js
commands: {
	"command": {
		info: "A command with specific options.",
		options: {
			"input": {
				info: "The input file."
				type: path
			},
			"output": {
				info: "The output file."
				type: path
			}
		},
		aliases: ["input","output"]
	}
}

//$ app command input.ext output.ext
```
* rename `options.aliases` to `options.arguments`?
* add `util.shell()` for easier project testing?

## Release History
* 0.2.0
  * added `input(args)`, `util.forceColors()`, `util.readHelpFile()`, `util.replaceColorVars()`, `util.stripColors()` for easier project testing
  * added support for multiple instances (no singleton)
* 0.1.9 avoided `String.prototype` colors (for the paranoid)
* 0.1.8 simplified color test
* 0.1.7 added `config.colors`, `config.merge()`, `help.indent()`
* 0.1.6 tested on Windows
* 0.1.5 added `option.sort`
* 0.1.4 added `option.rename`
* 0.1.3 added `option.hidden`
* 0.1.2 added `option.default`, help screen cleanup
* 0.1.1 added custom error messages
* 0.1.0 initial release

---

[![Analytics](https://ga-beacon.appspot.com/UA-3614308-14/stevenvachon/nopter)](https://github.com/igrigorik/ga-beacon "Google Analytics")
