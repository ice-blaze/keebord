import * as ListUtils from "../utils/list_utils.js"
import $ from "jquery";

export const US_CHARS = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?"

export const removeSameLettersFollowing = (text) => {
	// TODO removeSameLettersFollowing
	return text
}

const keepUSChars = (text) => {
	const chars = text.split("")
	const cleanedChars = chars.filter(char => US_CHARS.includes(char))
	const joinedCleanedChars = cleanedChars.join("")
	return joinedCleanedChars
}

const cleanText = (text) => {
	const noFollowingLetters = removeSameLettersFollowing(text)
	const noTabsText = keepUSChars(noFollowingLetters)

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

const loading = {
	// atomic ??
	current: 0,
	maximum: 1,
	init(maximum) {
		this.maximum = maximum
		this.current = 0
	},
	percentage() {
		return this.current / this.maximum * 100 // eslint-disable-line no-magic-numbers
	},
	cleanUI() {
		$("#loading").empty()
	},
	updateUI() {
		this.current += 1
		this.cleanUI()
		$("#loading").append(`
		<div class="progress">
			<div class="progress-bar" role="progressbar" style="width: ${this.percentage()}%"></div>
		</div>
		Finished : ${this.current} / ${this.maximum}
		`)
	},
}

const getFrequenciesDictonariesFromFiles = (filesGenerator) => {
	return filesGenerator.map(async fileGenerator => {
		const text = (await fileGenerator.next()).value
		const dictionary = getFrequencyDictionaryFromText(text)

		loading.updateUI()

		return dictionary
	})
}

export const getFrequenciesDictonaryFromFiles = async (filesGenerator) => {
	const arrayOfPromiseOfDictionaries = getFrequenciesDictonariesFromFiles(filesGenerator)
	loading.init(arrayOfPromiseOfDictionaries.length)

	const dicts = await Promise.all(arrayOfPromiseOfDictionaries)
	loading.cleanUI()

	const mergedDict = ListUtils.reduceDicts(dicts)
	return mergedDict
}
