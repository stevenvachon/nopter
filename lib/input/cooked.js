var nopt = require("nopt");

var util = require("../util");



function cooked(data)
{
	var noptOptions = {};
	var noptShortHands = {};
	
	util.eachOption( data.config, function(optionData, option)
	{
		noptOptions[option] = optionData.type;
		
		util.eachShorthand( data.config, option, function(short)
		{
			noptShortHands[short] = "--" + option;
		});
	});

	data.input.cooked = nopt(noptOptions, noptShortHands, process.argv);
}



module.exports = cooked;
