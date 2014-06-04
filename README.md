# nopter [![NPM Version](http://badge.fury.io/js/nopter.svg)](http://badge.fury.io/js/nopter) [![Build Status](https://secure.travis-ci.org/stevenvachon/nopter.svg)](http://travis-ci.org/stevenvachon/nopter) [![Dependency Status](https://david-dm.org/stevenvachon/nopter.svg)](https://david-dm.org/stevenvachon/nopter)

> A simple nopt wrapper for CLI apps.

If you don't need a crazy custom CLI app, get it done in no time with **nopter**.

Features:
* Easy syntax
* Argument aliases
* Built-in help screen

## Getting Started

This utility requires [Node.js](http://nodejs.org/) `~0.10`. To install, type this at the command line:
```
npm install nopter --save-dev
```

### Methods

#### config
Gets or sets the [configuration](#Configuration).

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
		type: require("path")
	}
}
```
`options.short` can be a `String` or an `Array`.  
`options.type` can be any of [these types](https://github.com/npm/nopt#types).

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
var nopter  = require("nopter");
var package = require("./package.json");
var path    = require("path");

nopter.config({
	title:       "Test App",
	name:        package.name,
	description: package.description,
	version:     package.version,
	options: {
		"help": {
			short: ["h","?"],
			info: "Display this help text.",
			type: Boolean
		},
		"input": {
			info: "Some file input.",
			type: path
		},
		"output": {
			info: "Some file output.",
			type: path
		},
	},
	aliases: ["input", "output"]
});

function cli() {
	if (nopter.input().help) {
		console.log( nopter.help() );
	}
}

module.exports = cli;

```
For more ideas, check out the [test file](https://github.com/stevenvachon/nopter/tree/master/test/meta/app.js).

## Release History
* 0.1.0 initial release

---

[![Analytics](https://ga-beacon.appspot.com/UA-3614308-14/stevenvachon/nopter)](https://github.com/igrigorik/ga-beacon "Google Analytics") [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/stevenvachon/nopter/trend.png)](https://bitdeli.com/free "Bitdeli Badge")