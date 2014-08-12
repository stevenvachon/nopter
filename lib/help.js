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
	
	var options = sortedOptions(data);
	
	table.push([ "\n"+"Options".underline ]);
	
	options.groupless.forEach( function(option, i)
	{
		var code = "--"+option.green;
		
		util.eachShorthand( data.config, option, function(short)
		{
			code += ", -"+short.green;
		});
		
		table.push([ "  "+code, data.config.options[option].info ]);
	});
	
	for (var i in options.groups)
	{
		table.push([ "\n"+("Options ("+i+")").underline ]);
		
		options.groups[i].forEach( function(option, j)
		{
			var code = "--"+option.green;
			
			util.eachShorthand( data.config, option, function(short)
			{
				code += ", -"+short.green;
			});
			
			table.push([ "  "+code, data.config.options[option].info ]);
		});
	}
	
	// ARGUMENTS
	
	if (data.config.aliases.length)
	{
		table.push([ "\n"+"Arguments".underline ]);
		
		data.config.aliases.forEach( function(alias)
		{
			table.push([ "  "+alias.toUpperCase().magenta, "Alias to --"+alias ]);
		});
	}
	
	// END
	
	var name        = eitherOr(data.config.name, "noname");
	var description = eitherOr(data.config.description, "");
	var title       = eitherOr(data.config.title, name.toUpperCase());
	var version     = eitherOr(data.config.version, "0.0.0");
	
	var usage = name.red+" "+"[OPTIONS]".green;
	
	if (data.config.aliases.length)
	{
		usage += " "+"[ARGS]".magenta;
	}
	
	var output = "";
	
	output += title;
	output += description ? ": "+description : "";
	output += " (v"+version+")";
	output += "\n";
	output += "\nUsage".underline;
	output += "\n  "+ usage.bold;
	output += "\n"+ table.toString();
	output += "\n";
	
	return output;
}



function eitherOr(a, b)
{
	return (!a || a==" ") ? b : a;
}



function sortedOptions(data)
{
	var sorted = { groups:{}, groupless:[] };
	
	util.eachOption( data.config, function(optionData, option)
	{
		if (!optionData.hidden)
		{
			if (optionData.sort)
			{
				if (!sorted.groups[optionData.sort])
				{
					sorted.groups[optionData.sort] = [];
				}
				
				sorted.groups[optionData.sort].push(option);
			}
			else
			{
				sorted.groupless.push(option);
			}
		}
	});
	
	return sorted;
}



module.exports = help;