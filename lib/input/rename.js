function rename(data)
{
	// Avoid hitting same key twice when making changes
	var keys = Object.keys(data.input.cooked);
	
	for (var i=keys.length-1; i>=0; i--)
	{
		var key = keys[i];
		
		if (key != "argv")
		{
			var newName = data.config.options[key].rename;
			
			if (newName)
			{
				if (data.input.cooked[newName] != undefined)
				{
					throw new Error('New name for "'+key+'" already exists');
				}
				
				data.input.cooked[newName] = data.input.cooked[key];
				delete data.input.cooked[key];
			}
		}
	}
}



module.exports = rename;
