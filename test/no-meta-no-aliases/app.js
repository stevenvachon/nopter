var requireUncached = require("require-uncached");
var nopter = requireUncached("../../lib");



nopter.config(
{
	options:
	{
		"help":
		{
			short: ["h","?"],
			info: "Display this help text.",
			type: Boolean
		}
	}
});



function cli(args)
{
	args = nopter.input(args);
	
	if (args.help)
	{
		return nopter.help(true);
	}
}



module.exports = cli;
