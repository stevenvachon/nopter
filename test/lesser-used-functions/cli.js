var nopter = require("../../lib");



function cli()
{
	this.nopter = new nopter();
	this.nopter.config(
	{
		options:
		{
			"custom-colors1":
			{
				rename: "customColors1",
				info: "Just one red.",
				type: Boolean
			},
			"custom-colors2":
			{
				rename: "customColors2",
				info: "No colors.",
				type: Boolean
			},
			"custom-colors3":
			{
				rename: "customColors3",
				info: "No colors #2.",
				type: Boolean
			},
			"indent":
			{
				short: "i",
				info: "The indent used for the help screen.",
				type: Boolean
			},
			"merge":
			{
				short: "m",
				info: "Merge configurations.",
				type: Boolean
			},
			"overwrite":
			{
				short: "o",
				info: "Overwrite configuration.",
				type: Boolean
			}
		}
	});
}



cli.prototype.input = function(args)
{
	var args = this.nopter.input(args);
	
	if (args.customColors1)
	{
		this.nopter.config.merge({ colors:["red",null,null] });
		return this.nopter.help();
	}
	else if (args.customColors2)
	{
		this.nopter.config.merge({ colors:[] });
		return this.nopter.help();
	}
	else if (args.customColors3)
	{
		this.nopter.config.merge({ colors:null });
		return this.nopter.help();
	}
	else if (args.indent)
	{
		return this.nopter.help.indent();
	}
	else if (args.merge)
	{
		this.nopter.config.merge({ name:"merged" });
		return this.nopter.config().name;
	}
	else if (args.overwrite)
	{
		this.nopter.config({options:{ "overwrite":{type:Boolean} }});
		return this.nopter.config().options;
	}
}



module.exports = cli;
