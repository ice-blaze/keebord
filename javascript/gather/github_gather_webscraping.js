import * as ListUtils from "../utils/list_utils.js"
import Cheerio from "cheerio"
import FindingFilesUIUpdate from "./ui_updates/finding_files_loading.js"
import {getFileFromUrl} from "./github_gather_api.js"

const GITHUB_BASE = "https://github.com/"

const fetchText = async (url) => {
	const response = await fetch(`https://keebord.herokuapp.com/prox/?url=${encodeURIComponent(url)}`);
	return response.text()
}

const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getProjectsFromDom = (dom) => {
	const cheerDom = Cheerio.load(dom)

	const nextUrl = cheerDom("a:contains('Next')").attr("href")
	// get all projects
	const repoUrlList = []
	cheerDom("a[itemprop='name codeRepository']")
		.each((idx, val) => {
			repoUrlList.push(val.attribs.href)
		})

	return {
		urls: repoUrlList,
		next: nextUrl,
	}
}

const getProjectsUrl = async (url, projectsUrls) => {
	const firstDom = await fetchText(url)

	const res = getProjectsFromDom(firstDom)
	projectsUrls.urls = projectsUrls.urls.concat(res.urls)
	if (res.next) {
		getProjectsUrl(res.next, projectsUrls)
	} else {
		projectsUrls.isFinished = true
	}
}

const isFinishedSyncTime = 300

// export default class UrlsFromUser {
export class UrlsFromUser {
	constructor(username, limitsHierarchy, limitsLanguagesAndFolders) {
		this.findingFilesUI = new FindingFilesUIUpdate()
		this.username = username
		this.limits = {
			hierarchy: limitsHierarchy,
			languagesAndFolders: limitsLanguagesAndFolders,
		}
	}

	async retrieveUrls() {
		this.projects = await this.projectsFromUser()

		const projectsPromise = this.projects.map(
			project => this.retrieveAllFilesFromAProject(this, project)
		)

		const urls = await Promise.all(projectsPromise)
		this.findingFilesUI.finish()

		const files = ListUtils.flatten(urls)

		const generatorUrls = files.map(getFileFromUrl)

		return generatorUrls
	}

	async retrieveAllFilesFromAProject(that, _projectPath) { // eslint-disable-line consistent-this
		const url = GITHUB_BASE + _projectPath
		const lim = this.limits
		const counter = {
			files: [],
			filesCounter: 0,
			foldersCurrent: 0,
			foldersMax: 1,
			limits: lim,
			projectPath: _projectPath,
		}

		const startDepth = 0
		const files = await this.extractPageUrls(
			url, counter, startDepth
		)

		while (counter.foldersCurrent < counter.foldersMax) {
			await sleep(isFinishedSyncTime) // eslint-disable-line no-await-in-loop
		}

		return files
	}

	// TODO handle errors with files access
	// TODO counter merge with files or url + projectPath
	async extractPageUrls (
		url, counter, depth
	) {
		const cheerDom = Cheerio.load(await fetchText(url))

		// get all links
		cheerDom("a[id].js-navigation-open")
			.each((idx, val) => {
				const regexFolder = /\/.*\/.*\/tree/
				const regexFile = /\/.*\/.*\/blob/
				const fileHref = val.attribs.href

				if (
					fileHref.match(regexFolder) &&
					depth < counter.limits.hierarchy.depth &&
					!counter.limits.hierarchy.arentTheyReached()
				) {
					counter.foldersMax += 1
					const nextUrl = GITHUB_BASE + val.attribs.href
					const nextDepth = 1
					this.extractPageUrls(nextUrl, counter, depth + nextDepth)
				} else if (
					fileHref.match(regexFile) &&
						!counter.limits.hierarchy.arentTheyReached()
				) {
					this.handleFile(fileHref, counter)
				}
			})
		counter.foldersCurrent += 1

		return counter.files
	}

	handleFile(fileHref, counter) {
		this.findingFilesUI.updateUI()
		counter.limits.hierarchy.allFilesCounter += 1
		counter.filesCounter += 1

		if (counter.limits.languagesAndFolders.isFileValid(fileHref)) {
			this.findingFilesUI.incValideFileCounter()
			const rawUrl = fileHref.split(/\/blob(.+)/)[1] // eslint-disable-line no-magic-numbers
			counter.files.push("https://raw.githubusercontent.com" + counter.projectPath + rawUrl)
		}
	}

	projectsFromUser() {
		const url = GITHUB_BASE + this.username + "?tab=repositories"
		const projectsUrls = {
			urls: [],
			isFinished: false,
		}

		return new Promise(async (resolve) => {
			getProjectsUrl(url, projectsUrls)

			while (!projectsUrls.isFinished) {
				await sleep(isFinishedSyncTime) // eslint-disable-line no-await-in-loop
			}

			resolve(ListUtils.sliceFromStart(projectsUrls.urls, this.limits.hierarchy.projects));
		})
	}
}
