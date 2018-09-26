import "chart.js"

// import * as DisplayErrors from "./display/errors.js"
import * as GitHubGatherAPI from "./gather/github_gather_api.js"
import * as GitHubGatherScrapping from "./gather/github_gather_webscraping.js"
import * as KeyboardDisplay from "./display/keyboard.js"
import * as KeyboardLayoutCreator from "./keyboard_layout_creator.js"
import * as TextFrequency from "./text_frequency.js"

import Chartkick from "chartkick"
import Limits from "./gather/limits.js"
import Vue from "../node_modules/vue/dist/vue.js"
import VueChartkick from "vue-chartkick"

Vue.use(VueChartkick, {Chartkick})


new Vue({
	el: "#app",
	data: {
		filesLimit: 200,
		depthLimit: 2,
		projectsLimit: 15,
		gitHubUsername: "",
		doesGitHubUserExist: "",
		frequenciesDictionary: [],
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
		async searchGithubUserProjects() {
			KeyboardDisplay.drawLoading()
			// this.frequenciesDictionary = "Loading..."
			const gitHubUsername = this.gitHubUsername

      const limits = new Limits(
        this.projectsLimit,
        this.depthLimit,
        this.filesLimit
      )
			// const urlsGenerator2 = await GitHubGatherAPI.getUrlsFromUser(gitHubUsername)
      const urlsFromUser = new GitHubGatherScrapping.UrlsFromUser(
        gitHubUsername, limits
      )

			const urlsGenerator = await urlsFromUser.retrieveUrls()

			const frequencyDict = await TextFrequency.getFrequenciesDictonaryFromFiles(urlsGenerator)

			const keyboardLayout = KeyboardLayoutCreator.getKeyboardLayout(frequencyDict)
			this.frequenciesDictionary = KeyboardLayoutCreator.getSortedFrequencyPairs(frequencyDict)
			this.finishedLoaded = true
			KeyboardDisplay.drawKeyboard(keyboardLayout)
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
