const replaceCommaWithPipe = (str) => {
	return str.split(",").join("|")
}

export default class ValidLanguagesAndFolders {
	constructor(languages, ignoreFolders) {
		this.languages = new RegExp("\.(?:" + replaceCommaWithPipe(languages) + ")$") // eslint-disable-line no-useless-escape
		this.ignoreFolders = new RegExp("^((?!\/(?:" + replaceCommaWithPipe(ignoreFolders) + ")\/).)*$") // eslint-disable-line no-useless-escape
	}

	isFileValid(filePath) {
		return filePath.match(this.languages) &&
			filePath.match(this.ignoreFolders)
	}

	// TODO add/remove language function in the this.languages/folders regex
}
