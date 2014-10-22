var colors = require("colors");



function errorString(error, additional, prefixForced, prefixBackup, color)
{
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
		error = error[color];
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



module.exports =
{
	fatal:  fatal,
	notice: notice,
	warn:   warn
};
