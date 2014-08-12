var child_process = require("child_process");
var fs = require("fs");
var pathModule = require("path");



function loadFile(url)
{
	return fs.readFileSync(__dirname+"/"+url, {encoding:"utf8"});
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
	loadFile: loadFile,
	shell:    shell,
	slashes:  slashes,
	stripCwd: stripCwd
};
