export default class ValidLanguages {
  constructor() {
    this.languages = /\.(?:php|cpp|js|rb|java|py|cs)$/
    this.ignoreFolders = /^((?!\/(?:build|dist)\/).)*$/
  }

  isFileValid(filePath) {
    return filePath.match(this.languages) &&
      filePath.match(this.ignoreFolders)
  }

  // TODO add/remove language function in the this.languages/folders regex
}
