import * as ListUtils from "./list_utils.js"

const auth = {
	method: "get",
	headers: {
		'Authorization': 'Basic '+btoa('ice-blaze:'),
	}
}

const API_URL = "https://api.github.com/"

async function fetchJson(url) {
	const fetchResult = await fetch(url, auth)
	return fetchResult.json()
}

async function getReposFromUser(username) {
	const repos = await fetchJson(API_URL + "users/" + username + "/repos")
	const names = repos.map(repo => repo.name)

	return names
}

async function getUrlsFromRepo(reponame, username) {
	const filesAndFolders = await fetchJson(API_URL + "repos/" + username + "/" + reponame + "/contents")

	// TODO filter with file extension
	const files = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "file" && fileOrFolder.name.endsWith(".js"))
	// const files = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "file")
	// TODO handle multiple level
	// const directories = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "dir")
	const urls = files.map(file => file.download_url)
	return urls.slice(1) // TODO DEBUG
	// return urls
}

async function *getFileFromUrl (url) {
	const fetchResult = await fetch(url)
	const text = await fetchResult.text()
	yield text
}

async function getUrlsFromRepos(reposPromise, username) {
	const repos = await reposPromise

	const filesUrlPromisArray = repos.map(reponame => getUrlsFromRepo(reponame, username))
	const filesUrl = await Promise.all(filesUrlPromisArray)
	const urls = ListUtils.flatten(filesUrl)
	const generatorUrls = urls.map(url => getFileFromUrl(url))
	return generatorUrls
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
