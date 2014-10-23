var requireUncached = require("require-uncached");
var nopter = requireUncached("../../lib");



nopter.config(
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

nopter.config.merge({ name:"merged" });



function cli(args)
{
	var args = nopter.input(args);
	
	if (args.customColors1)
	{
		nopter.config.merge({ colors:["red",null,null] });
		
		return nopter.help(true);
	}
	else if (args.customColors2)
	{
		nopter.config.merge({ colors:[] });
		
		return nopter.help(true);
	}
	else if (args.customColors3)
	{
		nopter.config.merge({ colors:null });
		
		return nopter.help(true);
	}
	else if (args.indent)
	{
		return nopter.help.indent();
	}
	else if (args.merge)
	{
		return nopter.config().name;
	}
	else if (args.overwrite)
	{
		nopter.config({options:{ "overwrite":{type:Boolean} }});
		
		return nopter.config().options;
	}
}



module.exports = cli;
