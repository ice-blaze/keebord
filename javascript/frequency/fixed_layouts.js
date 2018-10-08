const multiPop = (array, shouldBeLowerCase, numberOfElements) => {
	const result = []

	Array.from(Array(numberOfElements).keys()).forEach(() => {
		if (shouldBeLowerCase) {
			result.push(array.shift().toLowerCase())
		} else {
			result.push(array.shift().toUpperCase())
		}
	})

	return result
}

/* eslint-disable no-magic-numbers, max-statements */
export const groupAlpha = (sortedFreqArray) => {
	// alpha grouped (00=>first frequent alpha, 01=>second frequent alpha, ... )
	const alpha = sortedFreqArray.filter(element => element.match(/[a-zA-Z]/))
	const noAlpha = sortedFreqArray.filter(element => !element.match(/[a-zA-Z]/))

	noAlpha.splice(0, 0, ...multiPop(alpha, true, 7))
	noAlpha.splice(8, 0, ...multiPop(alpha, true, 2))
	noAlpha.splice(11, 0, ...multiPop(alpha, true, 10))
	noAlpha.splice(22, 0, ...multiPop(alpha, true, 5))
	noAlpha.splice(28, 0, ...multiPop(alpha, true, 1))
	noAlpha.splice(31, 0, ...multiPop(alpha, true, 1))

	noAlpha.splice(47, 0, ...multiPop(alpha, false, 7))
	noAlpha.splice(55, 0, ...multiPop(alpha, false, 2))
	noAlpha.splice(58, 0, ...multiPop(alpha, false, 10))
	noAlpha.splice(69, 0, ...multiPop(alpha, false, 5))
	noAlpha.splice(75, 0, ...multiPop(alpha, false, 1))
	noAlpha.splice(78, 0, ...multiPop(alpha, false, 1))

	return noAlpha
}
/* eslint-enable no-magic-numbers, max-statements */

/* eslint-disable no-magic-numbers, max-statements */
export const fixedQwerty = (sortedFreqArray) => {
	const noAlpha = sortedFreqArray.filter(element => !element.match(/[a-zA-Z]/))

	noAlpha.splice(0, 0, "f", "j", "d", "k", "s", "l", "a")
	noAlpha.splice(8, 0, "g", "h")
	noAlpha.splice(11, 0, "r", "u", "e", "i", "w", "o", "q", "p", "t", "y")
	noAlpha.splice(22, 0, "v", "n", "c", "m", "x")
	noAlpha.splice(28, 0, "z")
	noAlpha.splice(31, 0, "b")

	noAlpha.splice(47, 0, "F", "J", "D", "K", "S", "L", "A")
	noAlpha.splice(55, 0, "G", "H")
	noAlpha.splice(58, 0, "R", "U", "E", "I", "W", "O", "Q", "P", "T", "Y")
	noAlpha.splice(69, 0, "V", "N", "C", "M", "X")
	noAlpha.splice(75, 0, "Z")
	noAlpha.splice(78, 0, "B")

	return noAlpha
}
/* eslint-enable no-magic-numbers, max-statements */

export const fixedNum = (sortedFreqArray) => {
	const noAlpha = sortedFreqArray.filter(element => !element.match(/[0-9]/))

	noAlpha.splice(34, 0, "6", "5", "7", "4", "8", "3", "9", "2", "0", "1") // eslint-disable-line no-magic-numbers

	return noAlpha
}
