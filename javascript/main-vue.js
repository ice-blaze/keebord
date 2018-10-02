import "chart.js"
import "jquery-ui-bundle"
// import "jquery-ui-bundle/jquery-ui.css"

// import * as DisplayErrors from "./display/errors.js"
import * as GitHubGatherAPI from "./gather/github_gather_api.js"
import * as GitHubGatherScrapping from "./gather/github_gather_webscraping.js"
import * as KeyboardDisplay from "./display/keyboard.js"
import * as KeyboardLayoutCreator from "./keyboard_layout_creator.js"
import * as TextFrequency from "./text_frequency.js"

import $ from "jquery"
import Chartkick from "chartkick"
import LimitsProjectHierarchy from "./gather/limits_project_hierarchy.js"
import ValidLanguagesAndFolders from "./gather/valid_languages_and_folders.js"
import Vue from "../node_modules/vue/dist/vue.js"
import VueChartkick from "vue-chartkick"

Vue.use(VueChartkick, {Chartkick})


new Vue({
	el: "#app",
	data: {
		// inputs
		filesLimit: 200,
		depthLimit: 2,
		projectsLimit: 15,
		gitHubUsername: "",
		fileExtensions: "php,cpp,js,rb,java,py,cs",
		ignoreFolders: "build,dist,node_modules,temp",

		// form helper variables
		doesGitHubUserExist: "",
		frequenciesDictionary: [],
		projectsUsed: [],
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
			KeyboardDisplay.drawLoading()
			// this.frequenciesDictionary = "Loading..."
			const {limitsHierarchy, limitsLanguagesAndFolders} = this.getLimits()
			// const urlsGenerator2 = await GitHubGatherAPI.getUrlsFromUser(gitHubUsername)
			const urlsFromUser = new GitHubGatherScrapping.UrlsFromUser(
				this.gitHubUsername,
				limitsHierarchy,
				limitsLanguagesAndFolders
			)

			const urlsGenerator = await urlsFromUser.retrieveUrls()
			this.projectsUsed = urlsFromUser.projects

			const frequencyDict = await TextFrequency.getFrequenciesDictonaryFromFiles(urlsGenerator)

			const keyboardLayout = KeyboardLayoutCreator.getKeyboardLayout(frequencyDict)
			this.frequenciesDictionary = KeyboardLayoutCreator.getSortedFrequencyPairs(frequencyDict)
			this.finishedLoaded = true
			KeyboardDisplay.drawKeyboard(keyboardLayout)
		},
		alphaComma(event) {
			const alphaCommaRegex = /^[a-zA-Z]*(,[a-zA-Z]+)*$/
			if (!event.key.match(alphaCommaRegex)) {
				console.log("remove last input")
				console.log(event)

				console.log($(event.target).effect("shake"))
				event.preventDefault()
			}
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
// const qwertyLayout = KeyboardLayoutCreator.getKeyboardLayout(dict)
// KeyboardDisplay.drawKeyboard(qwertyLayout)
