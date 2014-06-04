var aliases = require("./aliases");
var cooked  = require("./cooked");
//var raw     = require("./raw");



function input(data)
{
	cooked(data);
	//raw(data);
	aliases(data);
	
	// Doesn't reflect alias changes
	delete data.input.cooked.argv;
}



module.exports = input;