var validate = require("./validate");



function aliases(data)
{
	if (!data.config.aliases) data.config.aliases = [];
	
	data.config.aliases.forEach( function(alias, i)
	{
		if ( data.config.options.hasOwnProperty(alias) )
		{
			var optionValue       = data.config.options[alias];
			var parsedArgValue    = data.input.cooked.argv.remain[i];
			var parsedOptionValue = data.input.cooked[alias];
			
			// Parsed option takes priority over argument
			if (!parsedOptionValue && parsedArgValue)
			{
				validate(optionValue.type, function(validateFunction)
				{
					data.input.raw[alias] = parsedArgValue;
					
					validateFunction( data.input.cooked, alias, parsedArgValue );
				});
			}
		}
		else
		{
			throw new Error('The alias "'+alias+'" does not exist');
		}
	});
}



module.exports = aliases;
