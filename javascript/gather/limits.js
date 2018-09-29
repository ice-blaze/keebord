export default class Limits {
	constructor(projectsLimit, depthLimit, filesLimit) {
		this.projects = projectsLimit
		this.depth = depthLimit
		this.files = filesLimit
		this.allFilesCounter = 0
	}

	arentTheyReached() {
		return this.allFilesCounter >= this.files
	}
}
