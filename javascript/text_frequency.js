import * as ListUtils from "./list_utils.js"

function removeSameLettersFollowing(text) {
		// TODO
		return text
}

function convertTabToSpace(text) {
		// TODO
		return text
}

// ...
function cleanText(text) {
		const noFollowingLetters = removeSameLettersFollowing(text)
		const noTabsText = convertTabToSpace(noFollowingLetters)
		// TODO ...
		// removeClosingBrackets // WARNING don't forget to add them on the final layout at least once
		//
		return noTabsText
}

function updateDictionaryFromText(dictionary, text) {
		const cleanedText = cleanText(text)
		for (const letter of cleanedText) {
				if (dictionary[letter]) {
						dictionary[letter] += 1
				} else {
						dictionary[letter] = 1
				}
		}
}

function getFrequenciesDictonariesFromFiles(filesGenerator) {
		return filesGenerator.then(filesGenerator => {
				return filesGenerator.map(fileGenerator => {
						const promiseFile = fileGenerator.next().value
						return promiseFile.then(text => {
								const dictionary = {}
								updateDictionaryFromText(dictionary, text)
								return dictionary
						})
				})
		})
}

export function getFrequenciesDictonaryFromFiles(filesGenerator) {
		const promise = getFrequenciesDictonariesFromFiles(filesGenerator)

		const then = promise.then(dicts => {
				return Promise.all(dicts).then(dicts => {
						const mergedDict = ListUtils.reduceDicts(dicts)
						return mergedDict
				})
		})

		return then
}
