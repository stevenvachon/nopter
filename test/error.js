var expect    = require("chai").expect;
var nopter    = require("../lib");
var stripAnsi = require("strip-ansi");



describe.only("Error messages", function()
{
	describe("as objects", function()
	{
		it("should work", function(done)
		{
			var result1 = stripAnsi( nopter.error.fatal(  new Error("Description."), "Additional" ) );
			var result2 = stripAnsi( nopter.error.notice( new Error("Description."), "Additional" ) );
			var result3 = stripAnsi( nopter.error.warn(   new Error("Description."), "Additional" ) );
			
			var expected = "Error: Description. Additional";
			
			expect(result1).to.equal(expected);
			expect(result2).to.equal(expected);
			expect(result3).to.equal(expected);
			
			done();
		});
		
		
		
		it("should support custom prefixes", function(done)
		{
			var result1 = stripAnsi( nopter.error.fatal(  new Error("Description."), "Additional", "Custom" ) );
			var result2 = stripAnsi( nopter.error.notice( new Error("Description."), "Additional", "Custom" ) );
			var result3 = stripAnsi( nopter.error.warn(   new Error("Description."), "Additional", "Custom" ) );
			
			var expected = "Custom: Description. Additional";
			
			expect(result1).to.equal(expected);
			expect(result2).to.equal(expected);
			expect(result3).to.equal(expected);
			
			done();
		});
		
		
		
		it("should add a period separator with color in correct places", function(done)
		{
			var result1 = nopter.error.fatal(  new Error("Description"), "Additional" );
			var result2 = nopter.error.notice( new Error("Description"), "Additional" );
			var result3 = nopter.error.warn(   new Error("Description"), "Additional" );
			
			var expected1 = "\u001b[31mError: Description.\u001b[39m Additional";
			var expected2 = "Error: Description. Additional";
			var expected3 = "\u001b[33mError: Description.\u001b[39m Additional";
			
			// REFERENCE :: To get ascii from ansii string
			//console.log(1, result1);
			
			expect(result1).to.equal(expected1);
			expect(result2).to.equal(expected2);
			expect(result3).to.equal(expected3);
			
			done();
		});
	});
	
	
	
	describe("as strings", function()
	{
		it("should work", function(done)
		{
			var result1 = stripAnsi( nopter.error.fatal(  "Description.", "Additional" ) );
			var result2 = stripAnsi( nopter.error.notice( "Description.", "Additional" ) );
			var result3 = stripAnsi( nopter.error.warn(   "Description.", "Additional" ) );
			
			var expected1 =   "Error: Description. Additional";
			var expected2 =  "Notice: Description. Additional";
			var expected3 = "Warning: Description. Additional";
			
			expect(result1).to.equal(expected1);
			expect(result2).to.equal(expected2);
			expect(result3).to.equal(expected3);
			
			done();
		});
		
		
		
		it("should support custom prefixes", function(done)
		{
			var result1 = stripAnsi( nopter.error.fatal(  "Description.", "Additional", "Custom" ) );
			var result2 = stripAnsi( nopter.error.notice( "Description.", "Additional", "Custom" ) );
			var result3 = stripAnsi( nopter.error.warn(   "Description.", "Additional", "Custom" ) );
			
			var expected = "Custom: Description. Additional";
			
			expect(result1).to.equal(expected);
			expect(result2).to.equal(expected);
			expect(result3).to.equal(expected);
			
			done();
		});
		
		
		
		it("should add a period separator with color in correct places", function(done)
		{
			var result1 = nopter.error.fatal(  "Description", "Additional" );
			var result2 = nopter.error.notice( "Description", "Additional" );
			var result3 = nopter.error.warn(   "Description", "Additional" );
			
			var expected1 = "\u001b[31mError: Description.\u001b[39m Additional";
			var expected2 = "Notice: Description. Additional";
			var expected3 = "\u001b[33mWarning: Description.\u001b[39m Additional";
			
			expect(result1).to.equal(expected1);
			expect(result2).to.equal(expected2);
			expect(result3).to.equal(expected3);
			
			done();
		});
	});
});
