var expect    = require("chai").expect;
var stripAnsi = require("strip-ansi");
var util      = require("./util");



describe("CLI app", function()
{
	describe("with meta", function()
	{
		it("should support full-length options", function(done)
		{
			util.shell("meta/app", ["--input","folder/file.ext", "--output","folder/file.ext"], function(error, stdout, stderr)
			{
				var result = JSON.parse(stdout);
				
				expect(result.input).to.be.a("string");
				expect(result.input).to.have.length.of.at.least(3);	// catch files of only a line break or two
				
				expect(result.output).to.be.a("string");
				expect(result.output).to.have.length.of.at.least(3);
				
				done();
			});
		});
		
		
		
		it("should support shorthand options", function(done)
		{
			util.shell("meta/app", ["-i","folder/file.ext", "-o","folder/file.ext"], function(error, stdout, stderr)
			{
				var result = JSON.parse(stdout);
				
				expect(result.input).to.be.a("string");
				expect(result.input).to.have.length.of.at.least(1);
				
				expect(result.output).to.be.a("string");
				expect(result.output).to.have.length.of.at.least(1);
				
				done();
			});
		});
		
		
		
		it("should support aliased/argument options", function(done)
		{
			util.shell("meta/app", ["folder/file.ext", "folder/file.ext"], function(error, stdout, stderr)
			{
				var result = JSON.parse(stdout);
				
				expect(result.input).to.be.a("string");
				expect(result.input).to.have.length.of.at.least(1);
				
				expect(result.output).to.be.a("string");
				expect(result.output).to.have.length.of.at.least(1);
				
				done();
			});
		});
		
		
		
		it.skip("should support aliased/argument options in strange order", function(done)
		{
			util.shell("meta/app", ["folder/file.ext", "-p","folder/file.ext", "folder/file.ext"], function(error, stdout, stderr)
			{
				/*var result = JSON.parse(stdout);
				
				expect(result.input).to.be.a("string");
				expect(result.input).to.have.length.of.at.least(1);
				
				expect(result.output).to.be.a("string");
				expect(result.output).to.have.length.of.at.least(1);*/
				
				done();
			});
		});
		
		
		
		it.skip("should support aliased/argument options in strange order with incorrect options", function(done)
		{
			util.shell("meta/app", ["folder/file.ext", "--fake","value", "folder/file.ext"], function(error, stdout, stderr)
			{
				/*var result = JSON.parse(stdout);
				
				expect(result.input).to.be.a("string");
				expect(result.input).to.have.length.of.at.least(1);
				
				expect(result.output).to.be.a("string");
				expect(result.output).to.have.length.of.at.least(1);*/
				
				done();
			});
		});
		
		
		
		it.skip("should support rawInput", function(done)
		{
			util.shell("meta/app", ["folder/file.ext", "-u","http://google.com", "folder/file.ext", "asdfasdf"], function(error, stdout, stderr)
			{
				if (error) throw error;
				
				console.log(stdout)
				
				//expect(stdout).to.equal("folder/file.ext");
				
				done();
			});
		});
		
		
		
		it("should show help menu", function(done)
		{
			util.shell("meta/app", ["-?"], function(error, stdout, stderr)
			{
				var expectedStdout = util.loadFile("meta/help.txt");
				stdout = stripAnsi(stdout);
				
				expect(stdout).to.equal(expectedStdout);
				
				done();
			});
		});
	});
	
	
	
	describe("with no meta or aliases", function()
	{
		it("should show help menu", function(done)
		{
			util.shell("no-meta-no-aliases/app", ["--help"], function(error, stdout, stderr)
			{
				var expectedStdout = util.loadFile("no-meta-no-aliases/help.txt");
				stdout = stripAnsi(stdout);
				
				expect(stdout).to.equal(expectedStdout);
				
				done();
			});
		});
	});
	
	
	
	describe("with no options", function()
	{
		it("should bail", function(done)
		{
			util.shell("no-options/app", ["--help"], function(error, stdout, stderr)
			{
				expect(error).to.not.be.null;
				
				done();
			});
		});
	});
	
	
	
	describe("with no config", function()
	{
		it("should bail", function(done)
		{
			util.shell("no-config/app", ["--help"], function(error, stdout, stderr)
			{
				expect(error).to.not.be.null;
				
				done();
			});
		});
	});
});
