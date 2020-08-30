const assert = require("assert");
const axios = require("axios");

describe("Array", function() {
	describe("The root route", function() {
		it("should return a 200 status code when requested", async function() {
			return axios.get("http://localhost:3000/").then(function(response) {
				assert.equal(response.status, 200);
			});
		});
	});
});
