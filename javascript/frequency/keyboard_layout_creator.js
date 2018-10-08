import * as FixedLayouts from "./fixed_layouts.js"
import * as TextFrequency from "./text_frequency.js"

// 	+47 for having the shift index
// Indexes:
// 	(notshifted)
// 00 01 02 03 04 05 06 07 08 09 10 11 12
//     13 14 15 16 17 18 19 20 21 22 23 24 25
//      26 27 28 29 30 31 32 33 34 35 36
//       37 38 39 40 41 42 43 44 45 46
// (shifted)
// 47 48 49 50 51 52 53 54 55 56 57 58 59
//     60 61 62 63 64 65 66 67 68 69 70 71 72
//      73 74 75 76 77 78 79 80 81 82 83
//       84 85 86 87 88 89 90 91 92 93

// 	Weights(shift is always worst, try to split hands):
// 45 43 41 39 37 35 34 36 38 40 42 44 46
//     17 15 13 11 19 20 12 14 16 18 21 32 33
//      06 04 02 00 08 09 01 03 05 07 10
//       28 26 24 22 31 23 25 27 29 30

// 92 90 88 86 84 82 81 83 85 87 89 91 93
//     64 62 60 58 66 67 59 61 63 65 68 79 80
//      53 51 49 47 55 56 48 50 52 54 57
//       75 73 71 69 78 70 72 74 76 77


// TODO Weights(shift can be better):

// TODO move to utils
const zip = (arr, ...arrs) => {
	return arr.map((val, i) => arrs.reduce(
		(a, arr) => [...a, arr[i]], [val]
	));
}

/* eslint-disable no-magic-numbers, array-element-newline */
const weightsConversion = [
	29, 32, 28, 33, 27, 34, 26, 35, 30, 31, 36, 16, 19, 15, 20, 14, 21, 13, 22,
	17, 18, 23, 40, 42, 39, 43, 38, 44, 37, 45, 46, 41, 24, 25, 6, 5, 7, 4, 8,
	3, 9, 2, 10, 1, 11, 0, 12, 76, 79, 75, 80, 74, 81, 73, 82, 77, 78, 83, 63,
	66, 62, 67, 61, 68, 60, 69, 64, 65, 70, 87, 89, 86, 90, 85, 91, 84, 92, 93,
	88, 71, 72, 53, 52, 54, 51, 55, 50, 56, 49, 57, 48, 58, 47, 59,
]
/* eslint-enable no-magic-numbers, array-element-newline */

const convertDictoToPairsList = (dict) => {
	const items = Object.keys(dict).map(keyDict => {
		return [keyDict, dict[keyDict]]
	})
	return items
}

const KEY = 0
const VAL = 1

const sortBySecondElement = (first, second) => {
	return second[VAL] - first[VAL];
}

export const getSortedFrequencyPairs = (frequencyDictionary) => {
	const pairs = convertDictoToPairsList(frequencyDictionary)
	pairs.sort(sortBySecondElement);

	return pairs
}

const getSortedFrequencyDictionary = (frequencyDictionary) => {
	const pairs = getSortedFrequencyPairs(frequencyDictionary)
	const highestToLowestKeys = pairs.map(pair => pair[KEY])

	return highestToLowestKeys
}

const copyDictionary = (dict) => {
	return JSON.parse(JSON.stringify(dict))
}

const addMissingChars = (frequencyDictionary) => {
	const noMissingCharsDictionary = copyDictionary(frequencyDictionary)

	for (const char of TextFrequency.US_CHARS) {
		if (!noMissingCharsDictionary[char]) {
			noMissingCharsDictionary[char] = -1
		}
	}

	return noMissingCharsDictionary
}

const ignoreCaseAndRemoveUpper = (frequenciesDictionary) => {
	const alreadyDone = []

	for (const key of Object.keys(frequenciesDictionary)) {
		const lowerKey = key.toLowerCase()
		const upperKey = key.toUpperCase()

		if (!alreadyDone.includes(lowerKey) && lowerKey.match(/[a-zA-Z]/)) {
			frequenciesDictionary[lowerKey] += frequenciesDictionary[upperKey]
			Reflect.deleteProperty(frequenciesDictionary, upperKey)

			alreadyDone.push(lowerKey)
		}
	}

	return frequenciesDictionary
}

const addUppercase = (array) => {
	const shiftDelta = 47

	array.forEach((element, index) => {
		if (element.match(/[a-z]/)) {
			array.splice(index + shiftDelta, 0, element.toUpperCase()) // eslint-disable-line no-magic-numbers
		}
	})

	return array
}

const splitKeyboard = (array) => {
	const pivot = 46

	const firstPart = array.slice(0, pivot) // eslint-disable-line no-magic-numbers
	const lastPart = array.slice(pivot)

	return {
		firstPart,
		lastPart,
	}
}

const addUppercaseAndMoveKeyBefore47 = (array) => {
	const {firstPart, lastPart} = splitKeyboard(array)

	const missingChars = lastPart.filter(char => char.match(/[a-zA-Z]/))

	const numericFirstPart = firstPart.filter(char => !char.match(/[a-zA-Z]/))
	const numericToRemove = numericFirstPart.slice(numericFirstPart.length - 1 - missingChars.length, numericFirstPart.length - 1) // eslint-disable-line no-magic-numbers

	// remove the numeric from first
	const cleanFirstPart = firstPart.filter(char => !numericToRemove.includes(char))
	// remove alpha from last
	const cleanLastPart = lastPart.filter(char => !missingChars.includes(char))
	// add numeric to last at first position
	cleanLastPart.unshift(...numericToRemove)
	// add alpha to first at last position
	cleanFirstPart.push(...missingChars)

	const okayKeyboard = addUppercase([...cleanFirstPart, ...cleanLastPart])

	return okayKeyboard
}

const addOptionsFree = (dict) => {
	return getSortedFrequencyDictionary(dict)
}

const addOptionsCaseTogether = (dict) => {
	const ignoredCase = ignoreCaseAndRemoveUpper(dict)
	const ignoredCaseArray = getSortedFrequencyDictionary(ignoredCase)
	return addUppercaseAndMoveKeyBefore47(ignoredCaseArray)
}

const addOptionsAlphaGrouped = (dict) => {
	const ignoredCase = ignoreCaseAndRemoveUpper(dict)
	const ignoredCaseArray = getSortedFrequencyDictionary(ignoredCase)
	const freqArray = addUppercaseAndMoveKeyBefore47(ignoredCaseArray)
	return FixedLayouts.groupAlpha(freqArray)
}

const addOptionsQwerty = (dict) => {
	const freqArray = getSortedFrequencyDictionary(dict)
	return FixedLayouts.fixedQwerty(freqArray)
}

const addOptionsQwertyAndNumeric = (dict) => {
	const freqArray = getSortedFrequencyDictionary(dict)
	const numeric = FixedLayouts.fixedNum(freqArray)
	const qwerty = FixedLayouts.fixedQwerty(numeric)
	return FixedLayouts.fixedNum(qwerty)
}

const convertFrequencyDictionaryIntoString = (dict, options) => {
	let withOptions = {}

	if (options === "free") {
		withOptions = addOptionsFree(dict)

	} else if (options === "caseTogether") {
		withOptions = addOptionsCaseTogether(dict)

	} else if (options === "alphaGrouped") {
		withOptions = addOptionsAlphaGrouped(dict)

	} else if (options === "qwertyAndNumeric") {
		withOptions = addOptionsQwertyAndNumeric(dict)

	} else if (options === "qwerty") {
		withOptions = addOptionsQwerty(dict)
	}

	const finalResult = []
	withOptions.forEach((value, index) => {
		finalResult[weightsConversion[index]] = value
	})

	return finalResult.join("")
}

const convertLayoutToPairsList = (layoutString) => {
	const layoutArray = layoutString.split("")

	const half = layoutArray.length / 2 // eslint-disable-line no-magic-numbers

	const unshifted = layoutArray.slice(0, half) // eslint-disable-line no-magic-numbers
	const shifted = layoutArray.slice(half)
	const pairs = zip(unshifted, shifted)

	return pairs
}

const convertPairListToKeyboardFormat = (pairList) => {
	return {
		/* eslint-disable no-magic-numbers */
		firstRow: pairList.slice(0, 13),
		secondRow: pairList.slice(13, 26),
		thirdRow: pairList.slice(26, 37),
		fourthRow: pairList.slice(37),
		/* eslint-disable no-magic-numbers */
	}
}

export const getKeyboardLayout = (frequencyDictionary, options) => {
	const completeFreqDict = addMissingChars(frequencyDictionary)

	const layoutString = convertFrequencyDictionaryIntoString(completeFreqDict, options)
	const pairList = convertLayoutToPairsList(layoutString)
	const keyboardFormat = convertPairListToKeyboardFormat(pairList)

	return keyboardFormat
}
