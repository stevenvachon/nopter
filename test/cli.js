var expect = require("chai").expect;
var nopter = require("../lib");
var path   = require("path");
var util   = require("./util");

var cli,result;



describe("Command line app", function()
{
	after(function(){  nopter.util.forceColors(false) });
	before(function(){ nopter.util.forceColors(true)  });
	
	
	
	describe("with meta", function()
	{
		beforeEach(function()
		{
			cli = new (require("./meta/cli.js"))();
		});
		
		
		
		it("should support full-length options", function(done)
		{
			result = cli.input("--input folder/file.ext --output folder/file.ext", true);
			
			expect( util.stripCwd(result.input)  ).to.equal( path.normalize("../folder/file.ext") );
			expect( util.stripCwd(result.output) ).to.equal( path.normalize("../folder/file.ext") );
			
			done();
		});
		
		
		
		it("should support shorthand options", function(done)
		{
			result = cli.input("--i folder/file.ext --o folder/file.ext", true);
			
			expect( util.stripCwd(result.input)  ).to.equal( path.normalize("../folder/file.ext") );
			expect( util.stripCwd(result.output) ).to.equal( path.normalize("../folder/file.ext") );
			
			done();
		});
		
		
		
		it("should support renamed options", function(done)
		{
			result = cli.input("-m", true);
			
			expect( result["--minify-abbr"] ).to.be.undefined;
			expect( result.minifyABBR ).to.be.true;
			
			done();
		});
		
		
		
		it("should support unknown options", function(done)
		{
			result = cli.input("-f --fake", true);
			
			expect(result.f).to.be.true;
			expect(result.fake).to.be.true;
			
			done();
		});
		
		
		
		it("should support aliased/argument options", function(done)
		{
			result = cli.input("folder/file.ext folder/file.ext", true);
			
			expect( util.stripCwd(result.input)  ).to.equal( path.normalize("../folder/file.ext") );
			expect( util.stripCwd(result.output) ).to.equal( path.normalize("../folder/file.ext") );
			
			done();
		});
		
		
		
		it.skip("should support aliased/argument options in strange order", function(done)
		{
			result = cli.input("folder/file.ext -p folder/file.ext folder/file.ext", true);
			
			//expect( util.stripCwd(result.input)  ).to.equal( path.normalize("../folder/file.ext") );
			//expect( util.stripCwd(result.output) ).to.equal( path.normalize("../folder/file.ext") );
			
			done();
		});
		
		
		
		it.skip("should support aliased/argument options in strange order with incorrect options", function(done)
		{
			result = cli.input("folder/file.ext --fake value folder/file.ext", true);
			
			//expect( util.stripCwd(result.input)  ).to.equal( path.normalize("../folder/file.ext") );
			//expect( util.stripCwd(result.output) ).to.equal( path.normalize("../folder/file.ext") );
			
			done();
		});
		
		
		
		it("should support array options", function(done)
		{
			result = cli.input("--inputs folder/file.ext --inputs folder/file.ext", true);
			
			result.inputs.forEach( function(value, i)
			{
				result.inputs[i] = util.stripCwd(value);
			});
			
			expect(result.inputs).to.deep.equal(
			[
				path.normalize("../folder/file.ext"),
				path.normalize("../folder/file.ext")
			]);
			
			done();
		});
		
		
		
		it("should support default values with defined option", function(done)
		{
			result = cli.input("-u", true);
			
			expect(result.url).to.equal("http://google.com/");
			
			done();
		});
		
		
		
		it("should support default values with non-defined option", function(done)
		{
			result = cli.input([], true);
			
			expect(result.url).to.equal("http://google.com/");
			
			done();
		});
		
		
		
		it("should support overriden default values", function(done)
		{
			result = cli.input("-u http://asdf.com", true);
			
			expect(result.url).to.equal("http://asdf.com/");
			
			done();
		});
		
		
		
		it("should show help screen", function(done)
		{
			result = cli.input("-?");
			
			var expectedResult = nopter.util.readHelpFile("./meta/help.txt");
			expectedResult = nopter.util.replaceColorVars(expectedResult);
			
			expect(result).to.equal(expectedResult);
			
			done();
		});
		
		
		
		it("should show help screen (child process)", function(done)
		{
			// `--color` is a colors.js arg
			util.shell("./meta/cli", ["-?","--color"], function(error, stdout, stderr)
			{
				var expectedStdout = nopter.util.readHelpFile("./meta/help.txt");
				expectedStdout = nopter.util.replaceColorVars(expectedStdout);
				
				expect(stdout).to.equal(expectedStdout);
				
				done();
			});
		});
	});
	
	
	
	describe("with no meta or aliases", function()
	{
		beforeEach(function()
		{
			cli = new (require("./no-meta-no-aliases/cli.js"))();
		});
		
		
		
		it("should show help screen", function(done)
		{
			result = cli.input("--help");
			
			var expectedResult = nopter.util.readHelpFile("./no-meta-no-aliases/help.txt");
			expectedResult = nopter.util.replaceColorVars(expectedResult);
			
			expect(result).to.equal(expectedResult);
			
			done();
		});
	});
	
	
	
	describe("with no options", function()
	{
		it("should bail", function(done)
		{
			try
			{
				cli = new (require("./no-options/cli.js"))();
			}
			catch (error)
			{
				cli = error;
			}
			
			expect(cli).to.be.instanceOf(Error);
			
			done();
		});
	});
	
	
	
	describe("with no config", function()
	{
		beforeEach(function()
		{
			cli = new (require("./no-config/cli.js"))();
		});
		
		
		
		it("should bail", function(done)
		{
			try
			{
				cli.input("--help");
			}
			catch (error)
			{
				cli = error;
			}
			
			expect(cli).to.be.instanceOf(Error);
			
			done();
		});
	});
	
	
	
	describe("with lesser-used functions", function()
	{
		beforeEach(function()
		{
			cli = new (require("./lesser-used-functions/cli.js"))();
		});
		
		
		
		it("should overwrite config", function(done)
		{
			result = cli.input("--overwrite");
			
			expect(result).to.deep.equal( {overwrite:{type:Boolean}} );
			
			done();
		});
		
		
		
		it("should support config.merge()", function(done)
		{
			result = cli.input("--merge");
			
			expect(result).to.equal("merged");
			
			done();
		});
		
		
		
		it("should support indent()", function(done)
		{
			result = cli.input("--indent");
			
			expect(result).to.equal("  ");
			
			done();
		});
		
		
		
		it("should support disabled colors (some)", function(done)
		{
			result = cli.input("--custom-colors1");
			
			var expectedResult = nopter.util.readHelpFile("./lesser-used-functions/help1.txt");
			expectedResult = nopter.util.replaceColorVars(expectedResult);
			
			expect(result).to.equal(expectedResult);
			
			done();
		});
		
		
		
		it("should support disabled colors (all)", function(done)
		{
			result = cli.input("--custom-colors2");
			
			var expectedResult = nopter.util.readHelpFile("./lesser-used-functions/help2.txt");
			expectedResult = nopter.util.replaceColorVars(expectedResult);
			
			expect(result).to.equal(expectedResult);
			
			done();
		});
		
		
		
		it("should support disabled colors (all #2)", function(done)
		{
			result = cli.input("--custom-colors3");
			
			var expectedResult = nopter.util.readHelpFile("./lesser-used-functions/help2.txt");
			expectedResult = nopter.util.replaceColorVars(expectedResult);
			
			expect(result).to.equal(expectedResult);
			
			done();
		});
	});
});
