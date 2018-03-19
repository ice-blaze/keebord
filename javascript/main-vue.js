import "chart.js"

import * as GitHubGather from "./github_gather.js"
import * as KeyboardLayoutCreator from "./keyboard_layout_creator.js"
import * as TextFrequency from "./text_frequency.js"
import * as VirtualKeybord from "./virtual_keyboard.js"

import Chartkick from "chartkick"
import Vue from "../node_modules/vue/dist/vue.js"
import VueChartkick from "vue-chartkick"

Vue.use(VueChartkick, { Chartkick })


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
		searchGithubUserProjects() {
			VirtualKeybord.drawLoading()
			// this.frequenciesDictionary = "Loading..."
			const gitHubUsername = this.gitHubUsername
			const urlsGenerator = GitHubGather.getUrlsFromUser(gitHubUsername)
			const frequencyDict = TextFrequency.getFrequenciesDictonaryFromFiles(urlsGenerator)

			frequencyDict.then(dict => {
				const keyboardLayout = KeyboardLayoutCreator.getKeyboardLayout(dict)
				this.frequenciesDictionary = KeyboardLayoutCreator.getSortedFrequencyPairs(dict)
				this.finishedLoaded = true
				VirtualKeybord.drawVirtualKeyboard(keyboardLayout)
			})
		},
	},
});

// debug
// const dict = TextFrequency.getFrequencyDictionaryFromText(TextFrequency.US_CHARS)
// const qwertyLayout = KeyboardLayoutCreator.getKeyboardLayout(dict)
// VirtualKeybord.drawVirtualKeyboard(qwertyLayout)
