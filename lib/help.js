var cliTable = require("cli-table");
var colors   = require("colors");

var util = require("./util");



function help(data)
{
	var table = new cliTable(
	{
		chars:
		{
			"top": "", "top-mid": "", "top-left": "", "top-right": "",
			"bottom": "", "bottom-mid": "", "bottom-left": "", "bottom-right": "",
			"left": "", "left-mid": "", "mid": "", "mid-mid": "",
			"right": "", "right-mid": "", "middle": " "
		},
		style:
		{
			"padding-left": 0,
			"padding-right": 1
		}
	});
	
	// OPTIONS
	
	table.push([ "\n"+"Options".underline ]);
	
	util.eachOption( data.config, function(optionData, option)
	{
		var code = "--"+option.green;
		
		util.eachShorthand( data.config, option, function(short)
		{
			code += ", -"+short.green;
		});
		
		table.push([ "  "+code, optionData.info ]);
	});
	
	// ARGUMENTS
	
	if (data.config.aliases.length)
	{
		table.push([ "\n"+"Arguments".underline ]);
		
		data.config.aliases.forEach( function(alias)
		{
			table.push([ "  "+alias.toUpperCase().magenta.bold, "Alias to --"+alias ]);
		});
	}
	
	// END
	
	var name        = data.config.name    || "noname";
	var description = data.config.description;
	var title       = data.config.title   || name.toUpperCase();
	var version     = data.config.version || "0.0.0";
	
	var output = "";
	
	output += title;
	output += description ? ": "+description : "";
	output += " (v"+version+")";
	output += "\n";
	output += "\nUsage".underline;
	output += "\n  "+ (name.red+" "+"[OPTIONS]".green+" "+"[ARGS]".magenta).bold;
	output += "\n" + table.toString();
	output += "\n";
	
	return output;
}



module.exports = help;