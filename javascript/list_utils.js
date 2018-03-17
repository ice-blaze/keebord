export function flatten(list) {
	return list.reduce(
		(a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
	)
}

export function mergeDicts(dictA, dictB) {
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

export function reduceDicts(dicts) {
	return dicts.reduce(dic => mergeDicts({}, dic))
}
