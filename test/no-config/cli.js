var nopter = require("../../lib");



function cli()
{
	this.nopter = new nopter();
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
