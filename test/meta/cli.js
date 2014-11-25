var nopter = require("../../lib");
var path   = require("path");
var pkg    = require("./package.json");
var url    = require("url");



function cli()
{
	this.nopter = new nopter();
	this.nopter.config(
	{
		title:       "Test App",
		name:        pkg.name,
		description: pkg.description,
		version:     pkg.version,
		colors:      ["cyan","magenta","yellow"],
		options:
		{
			"debug":
			{
				info: "Debug mode for testing.",
				hidden: true
			},
			"help":
			{
				short: ["h","?"],
				info: "Display this help text.",
				type: Boolean,
				sort: "toggles"
			},
			"input":
			{
				short: "i",
				info: "Some input file.",
				type: path
			},
			"inputs":
			{
				info: "Some input files.",
				type: [Array,path]
			},
			"minify-abbr":
			{
				rename: "minifyABBR",
				short: "m",
				info: "Some minifier.",
				type: Boolean,
				sort: "toggles"
			},
			"output":
			{
				short: "o",
				info: "Some output file.",
				type: path
			},
			"path":
			{
				short: "p",
				info: "For testing.",
				type: path
			},
			"url":
			{
				short: "u",
				info: "For testing.",
				type: url,
				default: "http://google.com"
			},
			"version":
			{
				short: "v",
				info: "Print the "+pkg.name+" version.",
				type: Boolean,
				sort: "toggles"
			}
		},
		aliases: ["input", "output"]
	});
}



cli.prototype.input = function(args, showArgs)
{
	var testing = !!args;
	args = this.nopter.input(args);
	
	if (testing && showArgs)
	{
		return args;
	}
	else if (args.help)
	{
		if (testing)
		{
			return this.nopter.help();
		}
		else
		{
			process.stdout.write( this.nopter.help() );
		}
	}
	else if (args.version)
	{
		process.stdout.write( this.nopter.config().version );
	}
};



module.exports = cli;
