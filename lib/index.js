var _help  = require("./help");
var _input = require("./input");
require("object.assign").shim();



var data =
{
	config: {},
	input: {}
};

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

var defaultInput =
{
	raw:{}, cooked:{}
};



function config(newValue)
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
		// Overwrite any existing config
		data.config = Object.assign({}, defaultConfig, newValue);
		data.input  = Object.assign({}, defaultInput);
		
		_input(data);
	}
	
	return data.config;
}



config.merge = function(newValues)
{
	if (newValues)
	{
		data.config = Object.assign(data.config, newValues);
		data.input  = Object.assign({}, defaultInput);
		
		_input(data);
	}
	
	return config();
}



function configCheck(force)
{
	if (!Object.keys(data.config.options).length || force)
	{
		throw new Error("options must be defined");
	}
}



function help()
{
	configCheck();
	return _help(data);
}



help.indent = function()
{
	return _help.indent();
}



function input()
{
	configCheck();
	return data.input.cooked;
}



function rawInput()
{
	configCheck();
	return data.input.raw;
}



module.exports =
{
	config:   config,
	error:    require("./error"),
	help:     help,
	input:    input,
	//rawInput: rawInput
};
