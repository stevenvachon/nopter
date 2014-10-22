var cliTable = require("cli-table");
var colors   = require("colors/safe");

var util = require("./util");



function color(str, data, num)
{
	if ( data.config.colors && data.config.colors[num] )
	{
		return colors[ data.config.colors[num] ](str);
	}
	else
	{
		return str;
	}
}



function help(data)
{
	var table = new cliTable(
	{
		chars:
		{
			"top":"", "top-mid":"", "top-left":"", "top-right":"",
			"bottom":"", "bottom-mid":"", "bottom-left":"", "bottom-right":"",
			"left":"", "left-mid":"", "mid":"", "mid-mid":"",
			"right":"", "right-mid":"", "middle":" "
		},
		style:
		{
			border: [],
			"padding-left": 0,
			"padding-right": 1
		}
	});
	
	// OPTIONS
	
	var options = sortedOptions(data);
	
	table.push([ "\n"+ colors.underline("Options") ]);
	
	options.groupless.forEach( function(option, i)
	{
		var code = "--" + color(option,data,1);
		
		util.eachShorthand( data.config, option, function(short)
		{
			code += ", -" + color(short,data,1);
		});
		
		table.push([ indent()+code, data.config.options[option].info ]);
	});
	
	for (var i in options.groups)
	{
		table.push([ "\n"+ colors.underline("Options ("+i+")") ]);
		
		options.groups[i].forEach( function(option, j)
		{
			var code = "--" + color(option,data,1);
			
			util.eachShorthand( data.config, option, function(short)
			{
				code += ", -" + color(short,data,1);
			});
			
			table.push([ indent()+code, data.config.options[option].info ]);
		});
	}
	
	// ARGUMENTS
	
	if (data.config.aliases.length)
	{
		table.push([ "\n"+ colors.underline("Arguments") ]);
		
		data.config.aliases.forEach( function(alias)
		{
			table.push([ indent()+color(alias.toUpperCase(),data,2), "Alias to --"+alias ]);
		});
	}
	
	// END
	
	var name        = eitherOr(data.config.name, "noname");
	var description = eitherOr(data.config.description, "");
	var title       = eitherOr(data.config.title, name.toUpperCase());
	var version     = eitherOr(data.config.version, "0.0.0");
	
	var usage = color(name,data,0) +" "+ color("[OPTIONS]",data,1);
	
	if (data.config.aliases.length)
	{
		usage += " "+ color("[ARGS]",data,2);
	}
	
	var output = "";
	
	output += title;
	output += description ? ": "+description : "";
	output += " (v"+version+")";
	output += "\n";
	output += "\n"+ colors.underline("Usage");
	output += "\n"+ indent() + colors.bold(usage);
	output += "\n"+ table.toString();
	output += "\n";
	
	return output;
}



function eitherOr(a, b)
{
	return (!a || a==" ") ? b : a;
}



function indent()
{
	return "  ";
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
module.exports.indent = indent;
