var nopter = require("../../lib");



nopter.config(
{
	options:
	{
		"custom-colors1":
		{
			rename: "customColors1",
			info: "Just one red.",
			type: Boolean
		},
		"custom-colors2":
		{
			rename: "customColors2",
			info: "No colors.",
			type: Boolean
		},
		"custom-colors3":
		{
			rename: "customColors3",
			info: "No colors #2.",
			type: Boolean
		},
		"indent":
		{
			short: "i",
			info: "The indent used for the help screen.",
			type: Boolean
		},
		"merge":
		{
			short: "m",
			info: "Merge configurations.",
			type: Boolean
		},
		"overwrite":
		{
			short: "o",
			info: "Overwrite configuration.",
			type: Boolean
		}
	}
});

nopter.config.merge({ name:"merged" });



function cli()
{
	if (nopter.input().customColors1)
	{
		nopter.config.merge({ colors:["red",null,null] });
		
		process.stdout.write( nopter.help() );
	}
	else if (nopter.input().customColors2)
	{
		nopter.config.merge({ colors:[] });
		
		process.stdout.write( nopter.help() );
	}
	else if (nopter.input().customColors3)
	{
		nopter.config.merge({ colors:null });
		
		process.stdout.write( nopter.help() );
	}
	else if (nopter.input().indent)
	{
		process.stdout.write( nopter.help.indent() );
	}
	else if (nopter.input().merge)
	{
		console.log( JSON.stringify( nopter.config().name ) );
	}
	else if (nopter.input().overwrite)
	{
		nopter.config({options:{ "overwrite":{type:Boolean} }});
		
		console.log( JSON.stringify( nopter.config() ) );
	}
}



module.exports = cli;
