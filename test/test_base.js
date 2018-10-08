import assert from "assert"
import {removeSameLettersFollowing} from "../javascript/frequency/text_frequency.js"

describe("Array", function() {
	describe("#indexOf()", function() {
		it("should return -1 when the value is not present", function() {
			assert.equal([].indexOf(4), -1) // eslint-disable-line no-magic-numbers
		})
	})
})

describe("Module linkage", function() {
	describe("removeSameLettersFollowing", function() {
		it("should return test", function() {
			const testString = "test"
			assert.equal(removeSameLettersFollowing(testString), testString)
		})
	})
})
