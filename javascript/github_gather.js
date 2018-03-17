import * as ListUtils from "./list_utils.js"

const auth = {
	method: "get",
	headers: {"Authorization": "Basic " + btoa("ice-blaze:")},
}

const API_URL = "https://api.github.com/"

const fetchJson = async (url) => {
	const fetchResult = await fetch(url, auth)
	return fetchResult.json()
}

const getReposFromUser = async (username) => {
	const repos = await fetchJson(API_URL + "users/" + username + "/repos")
	const names = repos.map(repo => repo.name)

	return names
}

const getUrlsFromRepo = async (reponame, username) => {
	const filesAndFolders = await fetchJson(API_URL + "repos/" + username + "/" + reponame + "/contents")

	// TODO filter with file extension
	const files = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "file" && fileOrFolder.name.endsWith(".js"))
	// const files = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "file")
	// TODO handle multiple level
	// const directories = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "dir")
	const urls = files.map(file => file.download_url)
	// TODO DEBUG
	const SLICE = 1
	return urls.slice(SLICE)
	// return urls
}

const getFileFromUrl = async function *(url) {
	const fetchResult = await fetch(url)
	const text = await fetchResult.text()
	yield text
}

const getUrlsFromRepos = async(reposPromise, username) => {
	const repos = await reposPromise

	const filesUrlPromisArray = repos.map(reponame => getUrlsFromRepo(reponame, username))
	const filesUrl = await Promise.all(filesUrlPromisArray)
	const urls = ListUtils.flatten(filesUrl)
	const generatorUrls = urls.map(url => getFileFromUrl(url))
	return generatorUrls
}

const NOT_FOUND = 404

export const userExist = async (username) => {
	const fetchResponse = await fetch(API_URL + "users/" + username)
	if (fetchResponse.status === NOT_FOUND) {
		return false
	}

	return true
}

export const getUrlsFromUser = (username) => {
	const repos = getReposFromUser(username)
	const urlsGenerator = getUrlsFromRepos(repos, username)
	return urlsGenerator
}
