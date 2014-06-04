function raw(data)
{
	console.log( data.input.cooked.argv.cooked );
	
	//console.log( data.input.cooked.argv.remain );
	
	var isValue = false;
	var currentOption = null;
	
	data.input.cooked.argv.cooked.forEach( function(arg)
	{
		if (isValue)
		{
			// For next index
			currentOption = null;
			isValue = false;
		}
		else if (arg.indexOf("-") == 0)
		{
			
			
			// For next index
			isValue = true;
		}
	});
}



// OLD
function rawInput(option, config)
{
	var input;
	
	console.log(config.parsedOptions.validated.argv)
	
	// Find the exact input specified by the user, for clarity
	config.parsedOptions.validated.argv.original.every( function(parsedOption, i)
	{
		//console.log(parsedOption, option)
		
		if (parsedOption == option)
		{
			input = config.parsedOptions.validated.argv.original[i+1];
			
			return false;
		}
		
		return true;
	});
	
	console.log("===============");
	
	return input;
}



module.exports = raw;
