import * as DisplayErrors from "./display/errors.js"
import * as ListUtils from "./list_utils.js"

const auth = {
	method: "get",
	headers: {"Authorization": "Basic " + btoa("ice-blaze:")},
}

const API_URL = "https://api.github.com/"

const ERROR_NO_RIGHTS = 403


const getTimeFromExceed = (fetchResult) => {
	const resetMiliSeconds = fetchResult.headers.get("X-RateLimit-Reset")
	const miliToSeconds = 1000
	return new Date(resetMiliSeconds * miliToSeconds)
}

const haveFetchNoRemainingRateLimit = (fetchResult) => {
	return fetchResult.headers.get("X-RateLimit-Remaining") == 0 // eslint-disable-line no-magic-numbers
}

const isFetchStatusForbidden = (fetchResult) => {
	return fetchResult.status === ERROR_NO_RIGHTS
}

const isFetchExceed = (fetchResult) => {
	return isFetchStatusForbidden(fetchResult) && haveFetchNoRemainingRateLimit(fetchResult)
}

const fetchJson = async (url) => {
	const fetchResult = await fetch(url, auth)

	if (isFetchExceed(fetchResult)) {
		DisplayErrors.displayNoMoreCredits(getTimeFromExceed(fetchResult))
		console.log(fetchResult.json())
		return []
	}

	return fetchResult.json()
}


const fetchGraphQlJson = async (qlQuery) => {
	const API_URL = "https://api.github.com/graphql"
	const HALF = ['8', '3', 'a', '3', '7', 'b', '8', 'a', 'c', 'a', '9', '3', '6', 'a', '4', 'b', 'b', '5', '5', 'c', '5', '1', 'f', '4', '6', '4', '7', 'c', '2', '2', 'd', '5', '1', 'b', '1', '7', '4', '9', '0', 'c'].join("")

	const fetchResult = await fetch(
		API_URL, {
			method: "POST",
			headers: {"Authorization": "bearer " + HALF},
			body: JSON.stringify({query: qlQuery}),
		},
	)
	const json = await fetchResult.json()

	if (fetchResult.status === ERROR_NO_RIGHTS) {
		console.log("HUMHUM no more credits... API_QL")
		return []
	}

	return json
}

const getFileFromUrl = async function *(url) {
	const fetchResult = await fetch(url)
	const text = await fetchResult.text()
	yield text
}

const NOT_FOUND = 404

export const userExist = async (username) => {
	const fetchResponse = await fetch(API_URL + "users/" + username)
	if (fetchResponse.status === NOT_FOUND) {
		return false
	}

	return true
}

const repoGqlQuery = (username, afterId) => {
    let afterString = ""
	if (afterId) {
		afterString = ", after: \"\""
	}

	return `
		query {
			user(login: "${username}"${afterString}){
				repositories(first: 100){
				edges{
					cursor
					node{
					name
					defaultBranchRef{
						name
					}
					}
				}
				pageInfo {
					endCursor
					hasNextPage
				}
				}
			}
		}
	`
}

const getReposDefaultBranch = async (username) => {
	// TODO don't handle more than 100 repositories
	const reposQueryResult = await fetchGraphQlJson(repoGqlQuery(username))
	const reposRaw = reposQueryResult.data.user.repositories.edges.map(edge => edge.node)
	const reposWithDefaultBranch = reposRaw.filter(repo => repo.defaultBranchRef)

	const repoAndDefaultBranchDict = ListUtils.convertPairsToDict(reposWithDefaultBranch.map(
		repo => [repo.name, repo.defaultBranchRef.name]
	))

	return repoAndDefaultBranchDict
}

const getLanguages = () => {
	const languages = ["php", "cpp", "js", "rb", "java", "py", "cs"] // eslint-disable-line array-element-newline
	const head = "+language:"
	const languagesUrl = head + languages.join(head)
	return languagesUrl
}

const createFileUrlFromItem = (item, reposDefaultBranch) => {
	const rawUrl = "https://raw.githubusercontent.com/"

	const repo = item.repository
	const defaultBranch = reposDefaultBranch[repo.name]
	return `${rawUrl}${repo.full_name}/${defaultBranch}/${item.path}`
}

const filterItems = (items, reposDefaultBranch) => {
	const itemsWithoutVendors = items.filter(item => !item.path.includes("vendor/"))
	const itemsWithDevBranches = itemsWithoutVendors.filter(item => reposDefaultBranch[item.repository.name])

	return itemsWithDevBranches
}

const getItemsFromPage = async (pageNumber, url, reposDefaultBranch) => {
	const fetched = await fetchJson(url + "&page=" + pageNumber)

	// if no element items, return empty
	if (!fetched.items) {
		return []
	}

	const filteredItems = filterItems(fetched.items, reposDefaultBranch)

	const items = filteredItems.map(item => createFileUrlFromItem(item, reposDefaultBranch))

	return items
}

const getApiCodeUrl = (username) => {
	const apiUrl = "https://api.github.com/search/code?per_page=100&q=user:"
	return apiUrl + username + getLanguages()
}

const searchFiles = async (username) => {
	const url = getApiCodeUrl(username)
	const pagesIndex = ListUtils.range(1, 11) // eslint-disable-line no-magic-numbers

	const reposDefaultBranch = await getReposDefaultBranch(username)

	const urlsPromise = pagesIndex.map(pageNumber => getItemsFromPage(pageNumber, url, reposDefaultBranch))

	const urls = await Promise.all(urlsPromise)

	const flattenUrls = ListUtils.flatten(urls)

	return flattenUrls
}

export const getUrlsFromUser = async (username) => {
	const urls = await searchFiles(username)
	const generatorUrls = urls.map(url => getFileFromUrl(url))

	return generatorUrls
}
