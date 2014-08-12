# nopter [![NPM Version](http://badge.fury.io/js/nopter.svg)](http://badge.fury.io/js/nopter) [![Build Status](https://secure.travis-ci.org/stevenvachon/nopter.svg)](http://travis-ci.org/stevenvachon/nopter) [![Dependency Status](https://david-dm.org/stevenvachon/nopter.svg)](https://david-dm.org/stevenvachon/nopter)

> A simple nopt wrapper for CLI apps.

If you don't need a crazy custom CLI app, get it done in no time with **nopter**.

Features:
* Easy syntax
* Argument aliases
* Built-in help screen

![Compile example](https://raw.github.com/stevenvachon/nopter/master/misc/help-screen.png)

## Getting Started

This utility requires [Node.js](http://nodejs.org/) `~0.10`. To install, type this at the command line:
```
npm install nopter --save-dev
```

### Methods

#### config
Gets or sets the [configuration](#Configuration).

#### error.fatal
Gets a (red) colored error message with a default "Error" prefix, but does not display/log it.
```js
nopter.error.fatal(error, additional, prefix);
```
`error` can be `Error` or `String`. If an `Error`, `error.name` will override the default `prefix`.  
`additional` [optional] is a second uncolored sentence.  
`prefix` [optional] overrides the default.

#### error.notice
Gets an uncolored error message with a default "Notice" prefix, but does not display/log it.
```js
nopter.error.notice(error, additional, prefix);
```
See [error.fatal](#errorfatal) for arguments info.

#### error.warn
Gets a (yellow) colored error message with a default "Warning" prefix, but does not display/log it.
```js
nopter.error.warn(error, additional, prefix);
```
See [error.fatal](#errorfatal) for arguments info.

#### help
Gets the help screen, but does not display/log it.

#### input
Gets the input parsed by nopt.

#### rawInput
**Coming in v0.2** Gets the raw or "uncooked" user input for a particular option. Especially useful when dealing with paths in error messages.

### Configuration

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
	"help": {
		short: ["h","?"],
		info: "Display this help text.",
		type: Boolean
	},
	"path": {
		short: "p",
		info: "Some file/directory.",
		type: require("path"),
		default: "/path/to/file",
		hidden: true
	}
}
```
`options.default` is optional and can be anything. Undefined options are simply `undefined`.  
`options.hidden` is an optional `Boolean` that hides the option in the help screen.  
`options.info` is required and should be a `String`.  
`options.rename` is an optional `String` that renames the option for easier use.  
`options.short` is optional and can be a `String` or an `Array`.  
`options.sort` is an optional `String` for visual grouping on the help screen.  
`options.type` is required and can be any of [these types](https://github.com/npm/nopt#types).

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
var nopter = require("nopter");
var path   = require("path");
var pkg    = require("./package.json");

nopter.config({
	title:       "Test App",
	name:        pkg.name,
	description: pkg.description,
	version:     pkg.version,
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
			info: "Image compression (0–100, default=80).",
			type: Number,
			default: 80
		},
		"special-cli": {
			rename: "specialCLI",
			info: "Does something special.",
			type: String
		}
	},
	aliases: ["input", "output"]
});

function cli() {
	if (nopter.input().help) {
		console.log( nopter.help() );
	} else {
		console.log( nopter.error.warn("Message","Use --help") );
	}
}

module.exports = cli;
```
For more ideas, check out the [test file](https://github.com/stevenvachon/nopter/tree/master/test/meta/app.js).

## Release History
* 0.1.5 added sort option
* 0.1.4 added rename option
* 0.1.3 added hidden options
* 0.1.2 added default values, help screen cleanup
* 0.1.1 added custom error messages
* 0.1.0 initial release

---

[![Analytics](https://ga-beacon.appspot.com/UA-3614308-14/stevenvachon/nopter)](https://github.com/igrigorik/ga-beacon "Google Analytics") [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/stevenvachon/nopter/trend.png)](https://bitdeli.com/free "Bitdeli Badge")