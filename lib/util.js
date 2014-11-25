"use strict";
var callerPath,colors,eol,fs,path,_splitargs;
var colorsEnabled;



function forceColors(forced)
{
	jit("colors");
	if (colorsEnabled === undefined)
	{
		// Not solidly reliable, as it's global and any library could have modified it
		// prior to this file accessing it, but it's probable that nothing else will
		colorsEnabled = colors.enabled;
	}
	
	colors.enabled = (forced || forced===undefined) ? true : colorsEnabled;
}



function jit(dep)
{
	switch (dep)
	{
		case "caller-path":
		{
			if (!callerPath) callerPath = require("caller-path");
			break;
		}
		case "colors":
		{
			if (!colors) colors = require("colors/safe");
			break;
		}
		case "eol":
		{
			if (!eol) eol = require("eol");
			break;
		}
		case "fs":
		{
			if (!fs) fs = require("fs");
			break;
		}
		case "path":
		{
			if (!path) path = require("path");
			break;
		}
		case "splitargs":
		{
			if (!_splitargs) _splitargs = require("splitargs");
			break;
		}
	}
}



function readHelpFile(filepath)
{
	jit("caller-path");
	jit("eol");
	jit("fs");
	jit("path");
	var str;
	
	filepath = path.resolve( path.dirname(callerPath()), filepath );
	
	str = fs.readFileSync(filepath, {encoding:"utf8"});
	str = eol.lf(str);
	
	return str;
}



function replaceColorVars(str)
{
	jit("colors");
	return str.replace(/({{(\/?([^}]+))}})/g, function(match, p1, p2, p3, offset, string)
	{
		if (p3)
		{
			var closer = p2.indexOf("/") == 0;
			
			return colors.styles[p3][closer ? "close" : "open"];
		}
	});
}



function splitargs(str)
{
	jit("splitargs");
	return _splitargs(str);
}



function stripColors(str)
{
	jit("colors");
	return colors.strip(str);
}



module.exports =
{
	forceColors: forceColors,
	readHelpFile: readHelpFile,
	replaceColorVars: replaceColorVars,
	splitargs: splitargs,
	stripColors: stripColors
};
