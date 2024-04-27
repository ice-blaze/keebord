// import * as DisplayErrors from "./display/errors.js"
import * as GitHubGatherAPI from "./gather/github_gather_api.js"
import * as GitHubGatherScrapping from "./gather/github_gather_webscraping.js"
import * as KeyboardDisplay from "./display/keyboard.js"
import * as KeyboardLayoutCreator from "./frequency/keyboard_layout_creator.js"
import * as TextFrequency from "./frequency/text_frequency.js"

import {alphaComma, removeComma} from "./utils/filter_inputs.js"
import LimitsProjectHierarchy from "./gather/limits_project_hierarchy.js"
import ValidLanguagesAndFolders from "./gather/valid_languages_and_folders.js"
import Vue from "../node_modules/vue/dist/vue.js"
import {updateFrequenciesChart} from "./frequency/frequencies_chart.js"

new Vue({
	el: "#app",
	data: {
		// inputs
		filesLimit: 200,
		depthLimit: 2,
		projectsLimit: 15,
		gitHubUsername: "",
		fileExtensions: "php,cpp,js,ts,rb,java,py,cs",
		ignoreFolders: "build,dist,node_modules,temp",
		layoutOptions: "caseTogether",

		// form helper variables
		doesGitHubUserExist: "",
		frequenciesDictionary: [],
		rawFrequenciesDictionary: [],
		filesFound: {},
		finishedLoaded: false,
		userIsValid: false,
		userIsInvalid: false,
		optionsVisibility: false,
	},
	methods: {
		showOptions() {
			this.optionsVisibility = !this.optionsVisibility
		},
		userExist() {
			GitHubGatherAPI.userExist(this.gitHubUsername).then(isValid => {
				if (isValid) {
					this.userIsValid = true
					this.userIsInvalid = false
					this.searchGithubUserProjects()
				} else {
					this.userIsValid = false
					this.userIsInvalid = true
				}
			})
		},
		getLimits() {
			const limitsHierarchy = new LimitsProjectHierarchy(
				this.projectsLimit,
				this.depthLimit,
				this.filesLimit
			)

			const limitsLanguagesAndFolders = new ValidLanguagesAndFolders(
				this.fileExtensions,
				this.ignoreFolders,
			)

			return {
				limitsHierarchy,
				limitsLanguagesAndFolders,
			}
		},
		async searchGithubUserProjects() {
			this.finishedLoaded = false
			KeyboardDisplay.drawLoading()
			const {limitsHierarchy, limitsLanguagesAndFolders} = this.getLimits()
			// const urlsGenerator2 = await GitHubGatherAPI.getUrlsFromUser(gitHubUsername)
			const urlsFromUser = new GitHubGatherScrapping.UrlsFromUser(
				this.gitHubUsername,
				limitsHierarchy,
				limitsLanguagesAndFolders
			)

			const urlsGenerator = await urlsFromUser.retrieveUrls()
			this.filesFound = urlsFromUser

			this.rawFrequenciesDictionary = await TextFrequency.getFrequenciesDictonaryFromFiles(urlsGenerator)
			this.createLayout()
			this.finishedLoaded = true
			updateFrequenciesChart(this.frequenciesDictionary)
		},
		createLayout() {
			const keyboardLayout = KeyboardLayoutCreator.getKeyboardLayout(this.rawFrequenciesDictionary, this.layoutOptions)
			this.frequenciesDictionary = KeyboardLayoutCreator.getSortedFrequencyPairs(this.rawFrequenciesDictionary)
			KeyboardDisplay.drawKeyboard(keyboardLayout)
		},
		alphaComma(event) {
			alphaComma(event)
		},
		removeComma() {
			removeComma(this)
		},
	},
})

// GitHubGatherScrapping.projectsFromUser("ice-blaze").then((urls) => {
//   GitHubGatherScrapping.retrieveAllFilesFromAProject(urls)
// })
// const limits = new Limits(
//   test.projectsLimit,
//   test.depthLimit,
//   test.filesLimit
// )
// const urlsFromUser = new GitHubGatherScrapping.UrlsFromUser("ice-blaze", limits)
// urlsFromUser.retrieveUrls()
// GitHubGatherScrapping.getUrlsFromUser("ice-blaze", limits)

// debug
// const dict = TextFrequency.getFrequencyDictionaryFromText(TextFrequency.US_CHARS)
// const qwertyLayout = KeyboardLayoutCreator.getKeyboardLayout(dict, "qwertyAndNumeric")
// KeyboardDisplay.drawKeyboard(qwertyLayout)
