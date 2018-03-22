import "chart.js"

import * as DisplayErrors from "./display/errors.js"
import * as GitHubGather from "./github_gather.js"
import * as KeyboardDisplay from "./display/keyboard.js"
import * as KeyboardLayoutCreator from "./keyboard_layout_creator.js"
import * as TextFrequency from "./text_frequency.js"

import Chartkick from "chartkick"
import Vue from "../node_modules/vue/dist/vue.js"
import VueChartkick from "vue-chartkick"

Vue.use(VueChartkick, {Chartkick})


new Vue({
	el: "#app",
	data: {
		gitHubUsername: "",
		doesGitHubUserExist: "",
		frequenciesDictionary: [],
		finishedLoaded: false,
		userIsValid: false,
		userIsInvalid: false,
	},
	methods: {
		userExist() {
			GitHubGather.userExist(this.gitHubUsername).then(isValid => {
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

			const urlsGenerator = await GitHubGather.getUrlsFromUser(gitHubUsername)

			const frequencyDict = await TextFrequency.getFrequenciesDictonaryFromFiles(urlsGenerator)

			const keyboardLayout = KeyboardLayoutCreator.getKeyboardLayout(frequencyDict)
			this.frequenciesDictionary = KeyboardLayoutCreator.getSortedFrequencyPairs(frequencyDict)
			this.finishedLoaded = true
			KeyboardDisplay.drawKeyboard(keyboardLayout)
		},
	},
})

// debug
// const dict = TextFrequency.getFrequencyDictionaryFromText(TextFrequency.US_CHARS)
// const qwertyLayout = KeyboardLayoutCreator.getKeyboardLayout(dict)
// KeyboardDisplay.drawKeyboard(qwertyLayout)
