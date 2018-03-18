import * as ListUtils from "./list_utils.js"

const auth = {
	method: "get",
	headers: {"Authorization": "Basic " + btoa("ice-blaze:")},
}

const API_URL = "https://api.github.com/"

const fetchJson = async (url) => {
	const fetchResult = await fetch(url, auth)
	const json = await fetchResult.json()

	if (fetchResult.status === 403) {
		console.log("HUMHUM no more credits...")
		return []
	}

	return json
}

const getReposFromUser = async (username) => {
	const repos = await fetchJson(API_URL + "users/" + username + "/repos")
	const names = repos.map(repo => repo.name)

	return names
}

const ignoreBadFolders = (folder) => {
	const badFolders = [
		"dst",
		"bin",
		"build",
		"vendor",
		"node_modules",
	]

	return badFolders.every(badFolder => folder === badFolder)
}

const getUrlsFromDirectories = async (directories, deep) => {
	const INCREMENT = 1
	const currentDeep = deep + INCREMENT
	// TODO deep level limit ??
	const maxDeep = 2
	if (currentDeep >= maxDeep) {
		return []
	}

	const allDirectories = directories.map(async (directory) => {
		const filesAndFolders = await fetchJson(directory.url)

		// TODO filter with file extension
		const unCleanedDirectories = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "dir")
		const directories = unCleanedDirectories.filter(ignoreBadFolders)
		const files = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "file" && fileOrFolder.name.endsWith(".js"))
		const subFiles = await getUrlsFromDirectories(directories, currentDeep)

		return [
			...files,
			...subFiles,
		]
	})

	const finishedFiles = await Promise.all(allDirectories)
	const flattenFiles = ListUtils.flatten(finishedFiles)
	return flattenFiles
}

const getUrlsFromRepo = async (reponame, username) => {
	const filesAndFolders = await fetchJson(API_URL + "repos/" + username + "/" + reponame + "/contents")

	const initialDeep = 0
	const directories = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "dir")
	const firstLeverFiles = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === "file" && fileOrFolder.name.endsWith(".js"))
	const flattenFiles = ListUtils.flatten(firstLeverFiles)

	const subDirectoriesFiles = await getUrlsFromDirectories(directories, initialDeep)
	const files = [
		...flattenFiles,
		...subDirectoriesFiles,
	]
	const urls = files.map(file => file.download_url)

	// TODO no more requests allowed signal

	return urls
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
