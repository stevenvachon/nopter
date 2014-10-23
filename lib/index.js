"use strict";
var callerPath,colors,eol,fs,help,path,splitargs;
var error = require("./error");
var input = require("./input");
require("object.assign").shim();



var api = {};
var config = {};
var defaultConfig =
{
	title: "",
	name: "noname",
	description: "",
	version: "0.0.0",
	colors: ["red","green","magenta"],
	options: {},
	aliases: []
};



function configCheck(force)
{
	if (!config.options || !Object.keys(config.options).length || force)
	{
		throw new Error("options must be defined");
	}
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
		case "help":
		{
			if (!help) help = require("./help");
			break;
		}
		case "path":
		{
			if (!path) path = require("path");
			break;
		}
		case "splitargs":
		{
			if (!splitargs) splitargs = require("splitargs");
			break;
		}
	}
}



api.config = function(newValue)
{
	if (!newValue)
	{
		configCheck();
	}
	else if (newValue && !newValue.options)
	{
		configCheck(true);
	}
	else
	{
		config = Object.assign({}, defaultConfig, newValue);
	}
	
	return config;
};



api.config.merge = function(newValues)
{
	if (newValues)
	{
		config = Object.assign(config, newValues);
	}
	
	return api.config();
};



api.error = error;



api.help = function(forceColors)
{
	var colorsEnabled,result;
	configCheck();
	jit("colors");
	jit("help");
	
	if (forceColors)
	{
		colorsEnabled = colors.enabled;
		colors.enabled = true;
	}
	
	result = help(config);
	
	if (forceColors)
	{
		colors.enabled = colorsEnabled;
	}
	
	return result;
};



api.help.indent = function()
{
	jit("help");
	return help.indent();
};



api.input = function(args, slice)
{
	configCheck();
	
	switch (typeof args)
	{
		case "string":
		{
			jit("splitargs");
			args = splitargs(args);
			break;
		}
		case "undefined":
		{
			args = process.argv;
			break;
		}
		default:
		{
			// Unlikely, but possible
			if (args !== process.argv)
			{
				// Force array
				args = Array.prototype.slice.call(args);
			}
		}
	}
	
	// Convenience for custom args
	if (args!==process.argv && slice==undefined)
	{
		slice = 0;
	}
	
	return input(args, config, slice);
};



api.util = {};



api.util.readHelpFile = function(filepath)
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
};



api.util.replaceColorVars = function(str)
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
};



api.util.stripColors = function(str)
{
	jit("colors");
	return colors.strip(str);
};



module.exports = api;
