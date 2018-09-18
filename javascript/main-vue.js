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

import Cheerio from "cheerio"

const fetchText = (url) => {
  return fetch(url).then((response) => {
    return response.text()
  })
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getProjectsFromDom = (dom) => {
  const cheerDom = Cheerio.load(dom)

  const nextURL = cheerDom("a:contains('Next')").attr("href")
  // get all projects
  const repoUrlList = []
  cheerDom("a[itemprop='name codeRepository']")
    .each((idx, val) => {
      repoUrlList.push(val.attribs.href)
    })

  return {
    urls: repoUrlList,
    next: nextURL,
  }
}

const projectsUrls = {
  urls: [],
  isFinished: false,
}

const getProjectsUrl = (url) => {
  fetchText(url)
    .then((firstDom) => {
      const res = getProjectsFromDom(firstDom)
      projectsUrls.urls = projectsUrls.urls.concat(res.urls)
      if (res.next) {
        getProjectsUrl(res.next)
      } else {
        projectsUrls.isFinished = true
      }
    })
}

const isFinishedSyncTime = 300
const finishWhenProjectsGathered = new Promise(async (resolve) => {
  getProjectsUrl("https://github.com/ice-blaze?tab=repositories")

  while (!projectsUrls.isFinished) {
    await sleep(isFinishedSyncTime)
  }

  resolve(projectsUrls.urls);
})

finishWhenProjectsGathered.then((urls) => {
  console.log(urls)
})




const promiseList = []
Promise.all(promiseList).then((values) => {
  console.log(values)
})


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
