var nopt     = require("nopt");

var util     = require("../util");
var validate = require("./validate");



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
	
	defaults(data);
}



function defaults(data)
{
	util.eachOption( data.config, function(optionData, option)
	{
		if (optionData.default!==undefined && data.input.cooked[option]===undefined)
		{
			validate(optionData.type, function(validateFunction)
			{
				validateFunction(data.input.cooked, option, optionData.default);
			});
		}
	});
}



module.exports = cooked;
