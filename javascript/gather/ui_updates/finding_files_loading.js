import $ from "jquery";

export default class FindingFilesUIUpdate {
	constructor() {
		this.currentFilesCount = 0
		this.currentValidFiles = 0
		this.UINode = $("#find_files")
	}

	incFileCounter() {
		this.currentFilesCount += 1
	}

	incValideFileCounter() {
		this.currentValidFiles += 1
	}

	cleanUI() {
		this.UINode.empty()
	}

	updateUI() {
		this.incFileCounter()
		this.cleanUI()
		// <div class="progress">
		// <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
		// </div>
		this.UINode.append(`
		<div class='lds-dual-ring'></div> <br>
		Currently files found: ${this.currentFilesCount} <br>
		Currently valide files found: ${this.currentValidFiles}
		`)
	}

	finish() {
		this.cleanUI()
		this.UINode.append(`
		Files found in total: ${this.currentFilesCount} <br>
		Valide files found in total: ${this.currentValidFiles} <br>
		`)
	}
}
