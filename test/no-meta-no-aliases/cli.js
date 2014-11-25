var nopter = require("../../lib");



function cli()
{
	this.nopter = new nopter();
	this.nopter.config(
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
}



cli.prototype.input = function(args)
{
	args = this.nopter.input(args);
	
	if (args.help)
	{
		return this.nopter.help();
	}
};



module.exports = cli;
