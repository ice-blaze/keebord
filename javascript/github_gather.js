import * as ListUtils from "./list_utils.js"

const auth = {
	method: "get",
	headers: {"Authorization": "Basic " + btoa("ice-blaze")},
}

const API_URL = "https://api.github.com/"

const ERROR_NO_RIGHTS = 403

const fetchJson = async (url) => {
	const fetchResult = await fetch(url, auth)
	const json = await fetchResult.json()

	if (fetchResult.status === ERROR_NO_RIGHTS) {
		console.log("HUMHUM no more credits... API")
		return []
	}

	return json
}


const fetchGraphQlJson = async (qlQuery) => {
	const API_URL = "https://api.github.com/graphql"
	const HALF = "73ffa3c066b213a458fa1"
	const fetchResult = await fetch(
		API_URL, {
			method: "POST",
			headers: {"Authorization": "bearer 7b9f3c06c02f2b0acb7" + HALF},
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

	const repoAndDefaultBranchDict = new Map(reposWithDefaultBranch.map(
		repo => [repo.name, repo.defaultBranchRef.name])
	)

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
	const itemsWithoutVendors = items.items.filter(item => !item.path.includes("vendor/"))
	const itemsWithDevBranches = itemsWithoutVendors.filter(item => reposDefaultBranch[item.repository.name])

	return itemsWithDevBranches
}

const getItemsFromPage = async (pageNumber, url, reposDefaultBranch) => {

	const fetched = await fetchJson(url + "&page=" + pageNumber)

	// if no element items, return empty
	if (!fetched.items) {
		console.log("no elements items found")
		return []
	}

	const filteredItems = filterItems(fetched, reposDefaultBranch)

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

	console.log("Urls finished")

	return flattenUrls
}

export const getUrlsFromUser = async (username) => {
	const urls = await searchFiles(username)
	const generatorUrls = urls.map(url => getFileFromUrl(url))

	return generatorUrls
}
