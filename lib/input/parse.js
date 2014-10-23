"use strict";
var nopt     = require("nopt");
var util     = require("../util");
var validate = require("./validate");



function parse(result, args, config, slice)
{
	var noptOptions = {};
	var noptShortHands = {};
	
	util.eachOption( config, function(optionData, option)
	{
		noptOptions[option] = optionData.type;
		
		util.eachShorthand( config, option, function(short)
		{
			noptShortHands[short] = "--" + option;
		});
	});
	
	// Shallow copy to preserve result object
	util.shallowCopy(result, nopt(noptOptions, noptShortHands, args, slice) );
	
	return result;
}



module.exports = parse;
