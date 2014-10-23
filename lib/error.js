"use strict";
var colors = require("colors/safe");



function errorString(error, additional, prefixForced, prefixBackup, color)
{
	var colorsEnabled;
	
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
		if (api.forceColors)
		{
			colorsEnabled = colors.enabled;
			colors.enabled = true;
		}
		
		error = colors[color](error);
		
		if (api.forceColors)
		{
			colors.enabled = colorsEnabled;
		}
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



function notice(error, additional, prefix)
{
	return errorString(error, additional, prefix, "Notice");
}



function warn(error, additional, prefix)
{
	return errorString(error, additional, prefix, "Warning", "yellow");
}



var api =
{
	fatal:  fatal,
	notice: notice,
	warn:   warn,
	
	forceColors: false
};



module.exports = api;
