function eachOption(config, callback)
{
	for (var i in config.options)
	{
		if ( config.options.hasOwnProperty(i) )
		{
			callback( config.options[i], i );
		}
	}
}



function eachShorthand(config, option, callback)
{
	var short = config.options[option].short;
	
	if (short)
	{
		if (short instanceof Array)
		{
			short.forEach(callback);
		}
		else
		{
			callback(short);
		}
	}
}



module.exports =
{
	eachOption:    eachOption,
	eachShorthand: eachShorthand
};
