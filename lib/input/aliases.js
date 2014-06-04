var nopt = require("nopt");



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
				for (var j in nopt.typeDefs)
				{
					if ( nopt.typeDefs.hasOwnProperty(j) && nopt.typeDefs[j].type===optionValue.type )
					{
						data.input.raw[alias] = parsedArgValue;
						
						nopt.typeDefs[j].validate( data.input.cooked, alias, parsedArgValue );
						
						break;
					}
				}
			}
		}
		else
		{
			throw new Error('The alias "'+alias+'" does not exist');
		}
	});
}



module.exports = aliases;
