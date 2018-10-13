import $ from "jquery"

export const alphaComma = (event) => {
	const alphaCommaRegex = /^[a-zA-Z]*(,[a-zA-Z]+)*,?$/
	if (!event.key.match(alphaCommaRegex)) {
		const parent = $(event.target).parent()

		if (!parent.is(":animated")) {
			parent.effect("shake")
		}

		event.preventDefault()
	}
}

const removeCommaFromString = (string) => {
	let result = string

	while (result.match(/,$/)) {
		result = result.slice(0, result.length - 1) // eslint-disable-line no-magic-numbers
	}

	return result
}

export const removeComma = (that) => {
	that.fileExtensions = removeCommaFromString(that.fileExtensions)
	that.ignoreFolders = removeCommaFromString(that.ignoreFolders)
}
