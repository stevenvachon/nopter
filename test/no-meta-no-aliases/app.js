var nopter = require("../../lib");



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



function cli()
{
	if (nopter.input().help)
	{
		console.log( nopter.help() );
	}
}



module.exports = cli;