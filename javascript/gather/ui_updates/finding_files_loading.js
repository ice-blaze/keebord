import $ from "jquery";

export default class FindingFilesUIUpdate {
	constructor() {
		this.mainNode = $("#find_files")
		this.mainNode.empty()
		this.currentFilesCount = 0
		this.currentValidFiles = 0
		this.mainNode.append(`
		<div class='lds-dual-ring'></div> <br>
		<div id="current-state-finding-files"></div
		`)
		this.textNode = $("#current-state-finding-files")
	}

	incFileCounter() {
		this.currentFilesCount += 1
	}

	incValideFileCounter() {
		this.currentValidFiles += 1
	}

	cleanUI() {
		this.textNode.empty()
	}

	updateUI() {
		this.incFileCounter()
		this.cleanUI()
		this.textNode.append(`
		Currently files found: ${this.currentFilesCount} <br>
		Currently valid files found: ${this.currentValidFiles}
		`)
	}

	finish() {
		this.mainNode.empty()
		this.mainNode.append(`
		Files found in total: ${this.currentFilesCount} <br>
		Valid files found in total: ${this.currentValidFiles} <br>
		`)
	}
}
