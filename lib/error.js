"use strict";
var colors;



function errorString(error, additional, prefixForced, prefixBackup, color)
{
	jit("colors");
	
	if (error instanceof Error)
	{
		error = (prefixForced || error.name)+": "+error.message;
	}
	else
	{
		error = (prefixForced || prefixBackup)+": "+error;
	}
	
	if (additional)
	{
		if (error.lastIndexOf(".") != error.length-1)
		{
			// Separation for `additional`
			error += ".";
		}
	}
	
	if (color)
	{
		error = colors[color](error);
	}
	
	if (additional)
	{
		// `additional` uses default color
		error += " "+additional;
	}
	
	return error;
}



function fatal(error, additional, prefix)
{
	return errorString(error, additional, prefix, "Error", "red");
}



function jit(dep)
{
	switch (dep)
	{
		case "colors":
		{
			if (!colors) colors = require("colors/safe");
			break;
		}
	}
}



function notice(error, additional, prefix)
{
	return errorString(error, additional, prefix, "Notice");
}



function warn(error, additional, prefix)
{
	return errorString(error, additional, prefix, "Warning", "yellow");
}



module.exports =
{
	fatal:  fatal,
	notice: notice,
	warn:   warn
};
