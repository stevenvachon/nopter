var child_process = require("child_process");
var colors = require("colors").styles;
var fs = require("fs");
var pathModule = require("path");



function loadHelpFile(url)
{
	var str = fs.readFileSync(__dirname+"/"+url, {encoding:"utf8"});
	
	return replaceColorVars(str);
}



function replaceColorVars(str)
{
	return str.replace(/({{(\/?([^}]+))}})/g, function(match, p1, p2, p3, offset, string)
	{
		if (p3)
		{
			var closer = p2.indexOf("/") == 0;
			
			return colors[p3][closer ? "close" : "open"];
		}
	});
}



function shell(shellfile, args, callback)
{
	args = ["./"+shellfile].concat(args);
	
	child_process.execFile("node", args, {cwd:__dirname}, callback);
}



function slashes(path)
{
	if (pathModule.sep == "/")
	{
		return path;
	}
	else
	{
		return path.replace(/\//g, pathModule.sep);
	}
}



function stripCwd(path)
{
	return pathModule.relative(__dirname, path);
}



module.exports =
{
	loadHelpFile: loadHelpFile,
	shell: shell,
	slashes: slashes,
	stripCwd: stripCwd
};
