import * as ListUtils from "./list_utils.js"

const auth = {
		method: "get",
		headers: {
				'Authorization': 'Basic '+btoa('ice-blaze:'),
		}
}

const API_URL = "https://api.github.com/"

function fetchJson(url) {
		return fetch(url, auth)
				.then(function(response) {
						return response.json()
				})
}

function getReposFromUser(username) {
		return fetchJson(API_URL + "users/" + username + "/repos")
				.then(function(repos) {
						const names = repos.map((repo) => repo.name)
						return names
				})
				.catch(function(error) {
						// TODO handle 404
						console.log(error)
				})
}

function getUrlsFromRepo(reponame, username) {
		return fetchJson(API_URL + "repos/" + username + "/" + reponame + "/contents")
				.then(function(filesAndFolders) {
						// TODO filter with file extension
						const files = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "file" && fileOrFolder.name.endsWith(".js"))
						// const files = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "file")
						// TODO handle multiple level
						// const directories = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "dir")
						const urls = files.map(file => file.download_url)
						return urls.slice(1) // TODO DEBUG
						// return urls
				})
}

function *getFileFromUrl (url) {
		yield fetch(url)
				.then(function(file) {
						return file.text().then(text => {
								return text
						})
				})
}

function getUrlsFromRepos(repos, username) {
		// WTF 3 return ?!?!
		return repos.then((repos) => {
				const filesUrl = repos.map(reponame => getUrlsFromRepo(reponame, username))
				return Promise.all(filesUrl).then((toto) => {
						return ListUtils.flatten(toto)
				})
		}).then(urls => {
				return urls.map(url => getFileFromUrl(url))
		})
}

const NOT_FOUND = 404

export async function userExist(username) {
		const fetchResponse = await fetch(API_URL + "users/" + username)
		if (fetchResponse.status === NOT_FOUND) {
				return false
		}

		return true
}

export function getUrlsFromUser(username) {
		const repos = getReposFromUser(username)
		const urlsGenerator = getUrlsFromRepos(repos, username)
		return urlsGenerator
}
