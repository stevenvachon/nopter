"use strict";
var util     = require("../util");
var validate = require("./validate");



function defaults(result, config)
{
	util.eachOption( config, function(optionData, option)
	{
		if (optionData.default!==undefined && result[option]===undefined)
		{
			validate(optionData.type, function(validateFunction)
			{
				validateFunction(result, option, optionData.default);
			});
		}
	});
}



module.exports = defaults;
