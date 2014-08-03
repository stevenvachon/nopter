var aliases = require("./aliases");
var cooked  = require("./cooked");
//var raw     = require("./raw");
var rename  = require("./rename");



function input(data)
{
	cooked(data);
	//raw(data);
	aliases(data);
	rename(data);
	
	// Doesn't reflect alias or rename changes
	delete data.input.cooked.argv;
}



module.exports = input;