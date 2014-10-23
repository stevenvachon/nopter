var requireUncached = require("require-uncached");
var nopter = requireUncached("../../lib");



function cli(args)
{
	args = nopter.input(args);
	
	if (args.help)
	{
		return nopter.help();
	}
}



module.exports = cli;
