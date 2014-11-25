var nopter = require("../../lib");



function cli()
{
	this.nopter = new nopter();
	this.nopter.config(
	{
		title:   "Test App",
		aliases: ["input", "output"]
	});
}



module.exports = cli;
