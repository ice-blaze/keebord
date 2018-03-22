export const flatten = (list) => {
	return list.reduce(
		(a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
	)
}

export const mergeDicts = (dictA, dictB) => {
	const mergeDict = Object.assign({}, dictA)

	Object.keys(dictB).forEach(key => {
		if (mergeDict[key]) {
			mergeDict[key] += dictB[key]
		} else {
			mergeDict[key] = dictB[key]
		}
	})

	return mergeDict
}

export const reduceDicts = (dicts) => {
	return dicts.reduce(dic => mergeDicts({}, dic), {})
}

export const range = (min, max) => {
	return Array.from(Array(max).keys()).slice(min)
}

export const convertPairsToDict = (pairs) => {
	const resultDictionary = {}
	const key = 0
	const value = 1

	pairs.forEach(pair => {
		resultDictionary[pair[key]] = pair[value]
	})

	return resultDictionary
}
