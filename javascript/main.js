import * as GitHubGather from "./github_gather.js"
import * as KeyboardLayoutCreator from "./keyboard_layout_creator.js"
import * as TextFrequency from "./text_frequency.js"
import * as VirtualKeybord from "./virtual_keyboard.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "../css/keyboard.css"
import Vue from "../node_modules/vue/dist/vue.js"
// import Vue from "vue"

new Vue({
		el: "#app",
		data: {
				gitHubUsername: "ice-blaz",
				doesGitHubUserExist: "",
				filesUrl: "",
		},
		methods: {
				searchGithubUserProjects() {
						this.filesUrl = "Loading..."
						const gitHubUsername = this.gitHubUsername
						const urlsGenerator = GitHubGather.getUrlsFromUser(gitHubUsername)
						const frequencyDict = TextFrequency.getFrequenciesDictonaryFromFiles(urlsGenerator)


						frequencyDict.then(dict => {
								const keyboardLayout = KeyboardLayoutCreator.getKeyboardLayout(dict)
								this.filesUrl = frequencyDict
								VirtualKeybord.drawVirtualKeyboard(keyboardLayout)
						})
				},
		},
});

// debug
// const dict = {}
// TextFrequency.updateDictionaryFromText(dict, TextFrequency.qwertyChars)
// const qwertyLayout = KeyboardLayoutCreator.getKeyboardLayout(dict)
// VirtualKeybord.drawVirtualKeyboard(qwertyLayout)
