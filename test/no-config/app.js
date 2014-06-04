var nopter = require("../../lib");



function cli()
{
	if (nopter.input().help)
	{
		console.log( nopter.help() );
	}
}



module.exports = cli;
