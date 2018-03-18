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
		(a, arr) => [
			...a,
			arr[i],
		], [val]
	));
}

/* eslint-disable no-magic-numbers, array-element-newline */
const weightsConversion = [
	29, 32, 28, 33, 27, 34, 26, 35, 30, 31, 36, 16, 19, 15, 20, 14, 21, 13, 22,
	17, 18, 23, 40, 42, 39, 43, 38, 44, 37, 45, 46, 41, 24, 25, 6, 5, 7, 4, 8,
	3, 9, 2, 10, 1, 11, 0, 12, 76, 79, 75, 80, 74, 81, 73, 82, 77, 78, 83, 63,
	66, 62, 67, 61, 68, 60, 69, 64, 65, 70, 87, 89, 86, 90, 85, 91, 84, 92, 93,
	88, 71, 72, 53, 52, 54, 51, 55, 50, 56, 49, 57, 48, 58, 47, 59
]
/* eslint-enable no-magic-numbers, array-element-newline */

const convertDictoToPairsList = (dict) => {
	const items = Object.keys(dict).map(keyDict => {
		return [
			keyDict,
			dict[keyDict],
		]
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

const convertFrequencyDictionaryIntoString = (dict) => {
	const keys = getSortedFrequencyDictionary(dict)
	const finalResult = []

	keys.forEach((value, index) => {
		finalResult[weightsConversion[index]] = value
	})

	return finalResult.join("")
}

const convertLayoutToPairsList = (layoutString) => {
	/* eslint-disable no-magic-numbers */
	const layoutArray = layoutString.split("")

	// TODO test if layout is dividable by two

	const half = layoutArray.length / 2

	const unshifted = layoutArray.slice(0, half)
	const shifted = layoutArray.slice(half)
	const pairs = zip(unshifted, shifted)

	return pairs
	/* eslint-disable no-magic-numbers */
}

const convertPairListToVirtualKeyboardFormat = (pairList) => {
	/* eslint-disable no-magic-numbers */
	return [
		pairList.slice(0, 13),
		pairList.slice(13, 26),
		pairList.slice(26, 37),
		pairList.slice(37),
	]
	/* eslint-disable no-magic-numbers */
}

export const getKeyboardLayout = (frequencyDictionary) => {
	const completeFreqDict = addMissingChars(frequencyDictionary)
	const layoutString = convertFrequencyDictionaryIntoString(completeFreqDict)
	const pairList = convertLayoutToPairsList(layoutString)
	const virtualKeyboardFormat = convertPairListToVirtualKeyboardFormat(pairList)

	return virtualKeyboardFormat
}
