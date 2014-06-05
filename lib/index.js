var _help  = require("./help");
var _input = require("./input");

var data =
{
	config: {},
	input: { raw:{}, cooked:{} }
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
		data.config = newValue;
		
		_input(data);
	}
	
	return data.config;
}



function configCheck(force)
{
	if (!data.config.options || force)
	{
		throw new Error("options must be defined");
	}
}



function help()
{
	configCheck();
	return _help(data);
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
