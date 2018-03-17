import * as ListUtils from "./list_utils.js"

export const US_CHARS = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?"

const removeSameLettersFollowing = (text) => {
	// TODO removeSameLettersFollowing
	return text
}

const keepUSChars = (text) => {
	const chars = text.split("")
	const cleanedChars = chars.filter(char => US_CHARS.includes(char))
	const joinedCleanedChars = cleanedChars.join("")
	return joinedCleanedChars
}

// ...
const cleanText = (text) => {
	const noFollowingLetters = removeSameLettersFollowing(text)
	const noTabsText = keepUSChars(noFollowingLetters)
	// TODO cleanText
	// removeClosingBrackets // WARNING don't forget to add them on the final layout at least once
	//
	return noTabsText
}

export const getFrequencyDictionaryFromText = (text) => {
	const cleanedText = cleanText(text)

	const dictionary = {}
	for (const letter of cleanedText) {
		if (dictionary[letter]) {
			dictionary[letter] += 1
		} else {
			dictionary[letter] = 1
		}
	}

	return dictionary
}

const getFrequenciesDictonariesFromFiles = async (filesGeneratorPromise) => {
	const filesGenerator = await filesGeneratorPromise
	return filesGenerator.map(async fileGenerator => {
		const text = (await fileGenerator.next()).value
		const dictionary = getFrequencyDictionaryFromText(text)

		return dictionary
	})
}

export const getFrequenciesDictonaryFromFiles = async (filesGenerator) => {
	const arrayOfPromiseOfDictionaries = await getFrequenciesDictonariesFromFiles(filesGenerator)
	const dicts = await Promise.all(arrayOfPromiseOfDictionaries)

	const mergedDict = ListUtils.reduceDicts(dicts)
	return mergedDict
}
