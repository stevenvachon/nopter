var child_process = require("child_process");
var path = require("path");



function shell(shellfile, args, callback)
{
	args = [shellfile].concat(args);
	
	child_process.execFile("node", args, {cwd:__dirname}, callback);
}



function stripCwd(filepath)
{
	return path.relative(__dirname, filepath);
}



module.exports =
{
	shell: shell,
	stripCwd: stripCwd
};
