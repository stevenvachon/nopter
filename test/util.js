var child_process = require("child_process");
var fs = require("fs");
var path = require("path");



function loadFile(url)
{
	return fs.readFileSync(__dirname+"/"+url, {encoding:"utf8"});
}



function shell(shellfile, args, callback)
{
	args = ["./"+shellfile].concat(args);
	
	child_process.execFile("node", args, {cwd:__dirname}, callback);
}



function stripCwd(filePath)
{
	return path.relative(__dirname, filePath);
}



module.exports =
{
	loadFile: loadFile,
	shell:    shell,
	stripCwd: stripCwd
};
