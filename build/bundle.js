/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./css/github-user.css":
/*!*****************************!*\
  !*** ./css/github-user.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../node_modules/css-loader!./github-user.css */ \"./node_modules/css-loader/index.js!./css/github-user.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./css/github-user.css?");

/***/ }),

/***/ "./css/keyboard.css":
/*!**************************!*\
  !*** ./css/keyboard.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../node_modules/css-loader!./keyboard.css */ \"./node_modules/css-loader/index.js!./css/keyboard.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./css/keyboard.css?");

/***/ }),

/***/ "./javascript/github_gather.js":
/*!*************************************!*\
  !*** ./javascript/github_gather.js ***!
  \*************************************/
/*! exports provided: userExist, getUrlsFromUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"userExist\", function() { return userExist; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUrlsFromUser\", function() { return getUrlsFromUser; });\n/* harmony import */ var _list_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list_utils.js */ \"./javascript/list_utils.js\");\n\n\nconst auth = {\n\t\tmethod: \"get\",\n\t\theaders: {\n\t\t\t\t'Authorization': 'Basic '+btoa('ice-blaze:'),\n\t\t}\n}\n\nconst API_URL = \"https://api.github.com/\"\n\nfunction fetchJson(url) {\n\t\treturn fetch(url, auth)\n\t\t\t\t.then(function(response) {\n\t\t\t\t\t\treturn response.json()\n\t\t\t\t})\n}\n\nfunction getReposFromUser(username) {\n\t\treturn fetchJson(API_URL + \"users/\" + username + \"/repos\")\n\t\t\t\t.then(function(repos) {\n\t\t\t\t\t\tconst names = repos.map((repo) => repo.name)\n\t\t\t\t\t\treturn names\n\t\t\t\t})\n\t\t\t\t.catch(function(error) {\n\t\t\t\t\t\t// TODO handle 404\n\t\t\t\t\t\tconsole.log(error)\n\t\t\t\t})\n}\n\nfunction getUrlsFromRepo(reponame, username) {\n\t\treturn fetchJson(API_URL + \"repos/\" + username + \"/\" + reponame + \"/contents\")\n\t\t\t\t.then(function(filesAndFolders) {\n\t\t\t\t\t\t// TODO filter with file extension\n\t\t\t\t\t\tconst files = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === \"file\" && fileOrFolder.name.endsWith(\".js\"))\n\t\t\t\t\t\t// const files = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === \"file\")\n\t\t\t\t\t\t// TODO handle multiple level\n\t\t\t\t\t\t// const directories = filesAndFolders.filter(fileOrFolder => fileOrFolder.type === \"dir\")\n\t\t\t\t\t\tconst urls = files.map(file => file.download_url)\n\t\t\t\t\t\treturn urls.slice(1) // TODO DEBUG\n\t\t\t\t\t\t// return urls\n\t\t\t\t})\n}\n\nfunction *getFileFromUrl (url) {\n\t\tyield fetch(url)\n\t\t\t\t.then(function(file) {\n\t\t\t\t\t\treturn file.text().then(text => {\n\t\t\t\t\t\t\t\treturn text\n\t\t\t\t\t\t})\n\t\t\t\t})\n}\n\nfunction getUrlsFromRepos(repos, username) {\n\t\t// WTF 3 return ?!?!\n\t\treturn repos.then((repos) => {\n\t\t\t\tconst filesUrl = repos.map(reponame => getUrlsFromRepo(reponame, username))\n\t\t\t\treturn Promise.all(filesUrl).then((toto) => {\n\t\t\t\t\t\treturn _list_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"flatten\"](toto)\n\t\t\t\t})\n\t\t}).then(urls => {\n\t\t\t\treturn urls.map(url => getFileFromUrl(url))\n\t\t})\n}\n\nconst NOT_FOUND = 404\n\nasync function userExist(username) {\n\t\tconst fetchResponse = await fetch(API_URL + \"users/\" + username)\n\t\tif (fetchResponse.status === NOT_FOUND) {\n\t\t\t\treturn false\n\t\t}\n\n\t\treturn true\n}\n\nfunction getUrlsFromUser(username) {\n\t\tconst repos = getReposFromUser(username)\n\t\tconst urlsGenerator = getUrlsFromRepos(repos, username)\n\t\treturn urlsGenerator\n}\n\n\n//# sourceURL=webpack:///./javascript/github_gather.js?");

/***/ }),

/***/ "./javascript/keyboard_layout_creator.js":
/*!***********************************************!*\
  !*** ./javascript/keyboard_layout_creator.js ***!
  \***********************************************/
/*! exports provided: getKeyboardLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getKeyboardLayout\", function() { return getKeyboardLayout; });\n/* harmony import */ var _text_frequency_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text_frequency.js */ \"./javascript/text_frequency.js\");\n\n\n/*\n\t+47 for having the shift index\n  Indexes:\n\t(notshifted)\n  00 01 02 03 04 05 06 07 08 09 10 11 12\n      13 14 15 16 17 18 19 20 21 22 23 24 25\n       26 27 28 29 30 31 32 33 34 35 36\n        37 38 39 40 41 42 43 44 45 46\n  (shifted)\n  47 48 49 50 51 52 53 54 55 56 57 58 59\n      60 61 62 63 64 65 66 67 68 69 70 71 72\n       73 74 75 76 77 78 79 80 81 82 83\n        84 85 86 87 88 89 90 91 92 93\n\n\tWeights(shift is always worst, try to split hands):\n  45 43 41 39 37 35 34 36 38 40 42 44 46\n      17 15 13 11 19 20 12 14 16 18 21 32 33\n       06 04 02 00 08 09 01 03 05 07 10\n        28 26 24 22 31 23 25 27 29 30\n\n  92 90 88 86 84 82 81 83 85 87 89 91 93\n      64 62 60 58 66 67 59 61 63 65 68 79 80\n       53 51 49 47 55 56 48 50 52 54 57\n        75 73 71 69 78 70 72 74 76 77\n\n  Weights(shift can be better):\n\t... TODO ..\n*/\nconst zip = (arr, ...arrs) => {\n\t\treturn arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));\n}\n\nconst weights = [\n\t\t45, 43, 41, 39, 37, 35, 34, 36, 38, 40, 42, 44, 46, 17, 15, 13, 11, 19, 20,\n\t\t12, 14, 16, 18, 21, 32, 33, 6, 4, 2, 0, 8, 9, 1, 3, 5, 7, 10, 28, 26, 24,\n\t\t22, 31, 23, 25, 27, 29, 30, 92, 90, 88, 86, 84, 82, 81, 83, 85, 87, 89, 91,\n\t\t93, 64, 62, 60, 58, 66, 67, 59, 61, 63, 65, 68, 79, 80, 53, 51, 49, 47, 55,\n\t\t56, 48, 50, 52, 54, 57, 75, 73, 71, 69, 78, 70, 72, 74, 76, 77,\n]\n\nfunction convertDictoToPairsList(dict) {\n\t\tconst items = Object.keys(dict).map(function(key) {\n\t\t\t\treturn [\n\t\t\t\t\t\tkey,\n\t\t\t\t\t\tdict[key]\n\t\t\t\t];\n\t\t})\n\t\treturn items\n}\n\nfunction sortBySecondElement(first, second) {\n\t\treturn second[1] - first[1];\n}\n\nfunction getHighestToLowestKeyFromFrequencyDictionary(frequencyDictionary) {\n\t\tconst pairs = convertDictoToPairsList(frequencyDictionary)\n\n\t\tpairs.sort(sortBySecondElement);\n\t\tconst highestToLowestKeys = pairs.map(pair => pair[0])\n\n\t\treturn highestToLowestKeys\n}\n\nfunction copyDictionary(dict) {\n\t\treturn JSON.parse(JSON.stringify(dict))\n}\n\nfunction addMissingChars(frequencyDictionary) {\n\t\tconst noMissingCharsDictionary = copyDictionary(frequencyDictionary)\n\n\t\tfor (const char of _text_frequency_js__WEBPACK_IMPORTED_MODULE_0__[\"qwertyChars\"]) {\n\t\t\t\tif (!noMissingCharsDictionary[char]) {\n\t\t\t\t\t\tnoMissingCharsDictionary[char] = -1\n\t\t\t\t}\n\t\t}\n\n\t\treturn noMissingCharsDictionary\n}\n\nfunction convertFrequencyDictionaryIntoString(dict) {\n\t\tconst keys = getHighestToLowestKeyFromFrequencyDictionary(dict)\n\t\tconst finalResult = []\n\n\t\tkeys.forEach((value, index) => {\n\t\t\t\tfinalResult[weights[index]] = value\n\t\t})\n\n\t\treturn finalResult.join(\"\")\n}\n\nfunction convertLayoutToPairsList(layoutString) {\n\t\tconst layoutArray = layoutString.split(\"\")\n\n\t\t// TODO test if layout is dividable by two\n\n\t\tconst half = layoutArray.length / 2\n\n\t\tconst unshifted = layoutArray.slice(0, half)\n\t\tconst shifted = layoutArray.slice(half)\n\t\tconst pairs = zip(unshifted, shifted)\n\n\t\treturn pairs\n}\n\nfunction convertPairListToVirtualKeyboardFormat(pairList) {\n\t\treturn [\n\t\t\t\tpairList.slice(0, 13),\n\t\t\t\tpairList.slice(13, 26),\n\t\t\t\tpairList.slice(26, 37),\n\t\t\t\tpairList.slice(37),\n\t\t]\n}\n\nfunction getKeyboardLayout(frequencyDictionary) {\n\t\tconst completeFreqDict = addMissingChars(frequencyDictionary)\n\t\tconst layoutString = convertFrequencyDictionaryIntoString(completeFreqDict)\n\t\tconst pairList = convertLayoutToPairsList(layoutString)\n\t\tconst virtualKeyboardFormat = convertPairListToVirtualKeyboardFormat(pairList)\n\n\t\treturn virtualKeyboardFormat\n}\n\n\n//# sourceURL=webpack:///./javascript/keyboard_layout_creator.js?");

/***/ }),

/***/ "./javascript/list_utils.js":
/*!**********************************!*\
  !*** ./javascript/list_utils.js ***!
  \**********************************/
/*! exports provided: flatten, mergeDicts, reduceDicts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"flatten\", function() { return flatten; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mergeDicts\", function() { return mergeDicts; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reduceDicts\", function() { return reduceDicts; });\nfunction flatten(list) {\n\t\treturn list.reduce(\n\t\t\t\t(a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []\n\t\t)\n}\n\nfunction mergeDicts(dictA, dictB) {\n\t\tconst mergeDict = Object.assign({}, dictA)\n\n\t\tObject.keys(dictB).forEach(key => {\n\t\t\t\tif (mergeDict[key]) {\n\t\t\t\t\t\tmergeDict[key] += dictB[key]\n\t\t\t\t} else {\n\t\t\t\t\t\tmergeDict[key] = dictB[key]\n\t\t\t\t}\n\t\t})\n\n\t\treturn mergeDict\n}\nfunction reduceDicts(dicts) {\n\t\treturn dicts.reduce(dic => mergeDicts({}, dic))\n}\n\n\n//# sourceURL=webpack:///./javascript/list_utils.js?");

/***/ }),

/***/ "./javascript/main.js":
/*!****************************!*\
  !*** ./javascript/main.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _github_gather_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./github_gather.js */ \"./javascript/github_gather.js\");\n/* harmony import */ var _keyboard_layout_creator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard_layout_creator.js */ \"./javascript/keyboard_layout_creator.js\");\n/* harmony import */ var _text_frequency_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text_frequency.js */ \"./javascript/text_frequency.js\");\n/* harmony import */ var _virtual_keyboard_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./virtual_keyboard.js */ \"./javascript/virtual_keyboard.js\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ \"./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _css_keyboard_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../css/keyboard.css */ \"./css/keyboard.css\");\n/* harmony import */ var _css_keyboard_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_css_keyboard_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _css_github_user_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../css/github-user.css */ \"./css/github-user.css\");\n/* harmony import */ var _css_github_user_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_css_github_user_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _node_modules_vue_dist_vue_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../node_modules/vue/dist/vue.js */ \"./node_modules/vue/dist/vue.js\");\n/* harmony import */ var _node_modules_vue_dist_vue_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_dist_vue_js__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\n// import Vue from \"vue\"\n\nnew _node_modules_vue_dist_vue_js__WEBPACK_IMPORTED_MODULE_7___default.a({\n\t\tel: \"#app\",\n\t\tdata: {\n\t\t\t\tgitHubUsername: \"\",\n\t\t\t\tdoesGitHubUserExist: \"\",\n\t\t\t\tfrequenciesDictionary: {},\n\t\t\t\tuserIsValid: false,\n\t\t\t\tuserIsInvalid: false,\n\t\t},\n\t\tmethods: {\n\t\t\t\tuserExist() {\n\t\t\t\t\t\t_github_gather_js__WEBPACK_IMPORTED_MODULE_0__[\"userExist\"](this.gitHubUsername).then( isValid => {\n\t\t\t\t\t\t\t\tif (isValid) {\n\t\t\t\t\t\t\t\t\t\tthis.userIsValid = true\n\t\t\t\t\t\t\t\t\t\tthis.userIsInvalid = false\n\t\t\t\t\t\t\t\t\t\tthis.searchGithubUserProjects()\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\tthis.userIsValid = false\n\t\t\t\t\t\t\t\t\t\tthis.userIsInvalid = true\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t})\n\t\t\t\t},\n\t\t\t\tsearchGithubUserProjects() {\n\t\t\t\t\t\t_virtual_keyboard_js__WEBPACK_IMPORTED_MODULE_3__[\"drawLoading\"]()\n\t\t\t\t\t\tthis.frequenciesDictionary = \"Loading...\"\n\t\t\t\t\t\tconst gitHubUsername = this.gitHubUsername\n\t\t\t\t\t\tconst urlsGenerator = _github_gather_js__WEBPACK_IMPORTED_MODULE_0__[\"getUrlsFromUser\"](gitHubUsername)\n\t\t\t\t\t\tconst frequencyDict = _text_frequency_js__WEBPACK_IMPORTED_MODULE_2__[\"getFrequenciesDictonaryFromFiles\"](urlsGenerator)\n\n\t\t\t\t\t\tfrequencyDict.then(dict => {\n\t\t\t\t\t\t\t\tconst keyboardLayout = _keyboard_layout_creator_js__WEBPACK_IMPORTED_MODULE_1__[\"getKeyboardLayout\"](dict)\n\t\t\t\t\t\t\t\tthis.frequenciesDictionary = dict\n\t\t\t\t\t\t\t\t_virtual_keyboard_js__WEBPACK_IMPORTED_MODULE_3__[\"drawVirtualKeyboard\"](keyboardLayout)\n\t\t\t\t\t\t})\n\t\t\t\t},\n\t\t},\n});\n\n// debug\n// const dict = {}\n// TextFrequency.updateDictionaryFromText(dict, TextFrequency.qwertyChars)\n// const qwertyLayout = KeyboardLayoutCreator.getKeyboardLayout(dict)\n// VirtualKeybord.drawVirtualKeyboard(qwertyLayout)\n\n\n//# sourceURL=webpack:///./javascript/main.js?");

/***/ }),

/***/ "./javascript/text_frequency.js":
/*!**************************************!*\
  !*** ./javascript/text_frequency.js ***!
  \**************************************/
/*! exports provided: qwertyChars, updateDictionaryFromText, getFrequenciesDictonaryFromFiles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"qwertyChars\", function() { return qwertyChars; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateDictionaryFromText\", function() { return updateDictionaryFromText; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getFrequenciesDictonaryFromFiles\", function() { return getFrequenciesDictonaryFromFiles; });\n/* harmony import */ var _list_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list_utils.js */ \"./javascript/list_utils.js\");\n\n\nconst qwertyChars = \"`1234567890-=qwertyuiop[]\\\\asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\\\"ZXCVBNM<>?\"\n\nfunction removeSameLettersFollowing(text) {\n\t\t// TODO\n\t\treturn text\n}\n\nfunction keepUSChars(text) {\n\t\tconst chars = text.split(\"\")\n\t\tconst cleanedChars = chars.filter(char => qwertyChars.includes(char))\n\t\tconst joinedCleanedChars = cleanedChars.join(\"\")\n\t\treturn joinedCleanedChars\n}\n\n// ...\nfunction cleanText(text) {\n\t\tconst noFollowingLetters = removeSameLettersFollowing(text)\n\t\tconst noTabsText = keepUSChars(noFollowingLetters)\n\t\t// TODO ...\n\t\t// removeClosingBrackets // WARNING don't forget to add them on the final layout at least once\n\t\t//\n\t\treturn noTabsText\n}\n\nfunction updateDictionaryFromText(dictionary, text) {\n\t\tconst cleanedText = cleanText(text)\n\t\tfor (const letter of cleanedText) {\n\t\t\t\tif (dictionary[letter]) {\n\t\t\t\t\t\tdictionary[letter] += 1\n\t\t\t\t} else {\n\t\t\t\t\t\tdictionary[letter] = 1\n\t\t\t\t}\n\t\t}\n}\n\nfunction getFrequenciesDictonariesFromFiles(filesGenerator) {\n\t\treturn filesGenerator.then(filesGenerator => {\n\t\t\t\treturn filesGenerator.map(fileGenerator => {\n\t\t\t\t\t\tconst promiseFile = fileGenerator.next().value\n\t\t\t\t\t\treturn promiseFile.then(text => {\n\t\t\t\t\t\t\t\tconst dictionary = {}\n\t\t\t\t\t\t\t\tupdateDictionaryFromText(dictionary, text)\n\t\t\t\t\t\t\t\treturn dictionary\n\t\t\t\t\t\t})\n\t\t\t\t})\n\t\t})\n}\n\nfunction getFrequenciesDictonaryFromFiles(filesGenerator) {\n\t\tconst promise = getFrequenciesDictonariesFromFiles(filesGenerator)\n\n\t\tconst then = promise.then(dicts => {\n\t\t\t\treturn Promise.all(dicts).then(dicts => {\n\t\t\t\t\t\tconst mergedDict = _list_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"reduceDicts\"](dicts)\n\t\t\t\t\t\treturn mergedDict\n\t\t\t\t})\n\t\t})\n\n\t\treturn then\n}\n\n\n//# sourceURL=webpack:///./javascript/text_frequency.js?");

/***/ }),

/***/ "./javascript/virtual_keyboard.js":
/*!****************************************!*\
  !*** ./javascript/virtual_keyboard.js ***!
  \****************************************/
/*! exports provided: drawVirtualKeyboard, drawLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawVirtualKeyboard\", function() { return drawVirtualKeyboard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawLoading\", function() { return drawLoading; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction addShiftActivation() {\n\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#keyboard .left-shift, #keyboard .right-shift\").click(() => {\n\t\t\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\".shifted\").toggle()\n\t\t\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\".unshifted\").toggle()\n\t\t})\n}\n\nfunction drawVirtualKeyboard(keyboardLayout) {\n\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#keyboard\").empty()\n\t\tconst appendLine = (line) => {\n\t\t\t\tfor(const tuple of line){\n\t\t\t\t\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#keyboard\").append(`<li><span class=\"unshifted\">${tuple[0]}</span><span class=\"shifted\">${tuple[1]}</span></li>`)\n\t\t\t\t}\n\t\t}\n\t\tappendLine(keyboardLayout[0])\n\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#keyboard\").append(`<li class=\"delete lastitem\">&#x232b;</li>`)\n\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#keyboard\").append(`<li class=\"tab\">↹</li>`)\n\t\tappendLine(keyboardLayout[1])\n\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#keyboard\").append(`<li class=\"capslock\">&#8682;</li>`)\n\t\tappendLine(keyboardLayout[2])\n\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#keyboard\").append(`<li class=\"return lastitem\">&#9166;</li>`)\n\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#keyboard\").append(`<li class=\"left-shift\">&#8679;</li>`)\n\t\tappendLine(keyboardLayout[3])\n\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#keyboard\").append(`<li class=\"right-shift lastitem\">&#8679;</li>`)\n\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#keyboard\").append(`<li class=\"space lastitem\">&nbsp;</li>`)\n\n\t\taddShiftActivation()\n}\n\nfunction drawLoading() {\n\t\tjquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#keyboard\").append(`Loading...`)\n}\n\n\n//# sourceURL=webpack:///./javascript/virtual_keyboard.js?");

/***/ }),

/***/ "./node_modules/bootstrap/dist/css/bootstrap.min.css":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.min.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../css-loader!./bootstrap.min.css */ \"./node_modules/css-loader/index.js!./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./node_modules/bootstrap/dist/css/bootstrap.min.css?");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./css/github-user.css":
/*!*******************************************************!*\
  !*** ./node_modules/css-loader!./css/github-user.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"#github-user.invalid {\\n\\t\\tbackground: #ffcfcc;\\n\\t\\tborder-color: #d9534f;\\n}\\n\\n#github-user.valid {\\n\\t\\tbackground: #ceefce;\\n\\t\\tborder-color: #5cb85c;\\n}\\n\\n.hide {\\n\\t\\tdisplay: none;\\n}\\n\\n.no-user {\\n\\t\\tcolor: #d9534f;\\n\\t\\tfont-weight: bold;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./css/github-user.css?./node_modules/css-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./css/keyboard.css":
/*!****************************************************!*\
  !*** ./node_modules/css-loader!./css/keyboard.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"#keyboard {\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tlist-style: none;\\n}\\n\\n#keyboard li {\\n\\t\\tfloat: left;\\n\\t\\tmargin: 0 5px 5px 0;\\n\\t\\twidth: 2vw; /*40px*/\\n\\t\\tmin-width: 20px;\\n\\t\\theight: 2em;\\n\\t\\tline-height: 2em;\\n\\t\\ttext-align: center;\\n\\t\\tbackground: #fff;\\n\\t\\t/* border: 1px solid #f9f9f9; */\\n\\t\\tborder: 1px solid #595959;\\n\\t\\t-moz-border-radius: 5px;\\n\\t\\t-webkit-border-radius: 5px;\\n}\\n\\n.capslock, .tab, .left-shift {\\n\\t\\tclear: left;\\n}\\n\\n#keyboard .tab, #keyboard .delete {\\n\\t\\t/* width: 70px; */\\n\\t\\tmin-width: 30px;\\n\\t\\twidth: 3vw;\\n}\\n\\n#keyboard .capslock {\\n\\t\\t/* width: 80px; */\\n\\t\\tmin-width: 40px;\\n\\t\\twidth: 4vw;\\n}\\n\\n#keyboard .return {\\n\\t\\t/* width: 77px; */\\n\\t\\tmin-width: 35px;\\n\\t\\twidth: 3vw;\\n}\\n\\n#keyboard .left-shift {\\n\\t\\t/* width: 95px; */\\n\\t\\tmin-width: 50px;\\n\\t\\twidth: 5vw;\\n\\t\\tbackground: linear-gradient(to right, #ff8008, #ffc837);\\n\\t\\tborder: 0px;\\n}\\n\\n#keyboard .right-shift {\\n\\t\\t/* width: 109px; */\\n\\t\\tmin-width: 50px;\\n\\t\\twidth: 5vw;\\n\\t\\tbackground: linear-gradient(to right, #ff8008, #ffc837);\\n\\t\\tborder: 0px;\\n}\\n\\n#keyboard .left-shift:hover{\\n\\t\\t-webkit-filter: brightness(80%);\\n\\t\\t-webkit-transition: all 0.4s ease;\\n\\t\\t-moz-transition: all 0.4s ease;\\n\\t\\t-o-transition: all 0.4s ease;\\n\\t\\t-ms-transition: all 0.4s ease;\\n\\t\\ttransition: all 0.4s ease;\\n}\\n\\n#keyboard .right-shift:hover{\\n\\t\\t-webkit-filter: brightness(80%);\\n\\t\\t-webkit-transition: all 0.4s ease;\\n\\t\\t-moz-transition: all 0.4s ease;\\n\\t\\t-o-transition: all 0.4s ease;\\n\\t\\t-ms-transition: all 0.4s ease;\\n\\t\\ttransition: all 0.4s ease;\\n}\\n\\n.lastitem {\\n\\t\\tmargin-right: 0;\\n}\\n\\n.uppercase {\\n\\t\\ttext-transform: uppercase;\\n}\\n\\n#keyboard .space {\\n\\t\\tclear: left;\\n\\t\\t/* width: 681px; */\\n\\t\\tmin-width: 360px;\\n\\t\\twidth: 34vw;\\n}\\n\\n.shifted {\\n\\t\\tdisplay: none;\\n}\\n\\n.keyboard_container {\\n\\t\\tmin-width: 360px;\\n\\t\\twidth: 36vw;\\n\\t\\theight: 100px;\\n\\t\\ttext-align: center;\\n\\t\\tmargin: auto;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./css/keyboard.css?./node_modules/css-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/bootstrap/dist/css/bootstrap.min.css":
/*!*************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/bootstrap/dist/css/bootstrap.min.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/code/node_modules/bootstrap/dist/css/bootstrap.min.css'\");\n\n//# sourceURL=webpack:///./node_modules/bootstrap/dist/css/bootstrap.min.css?./node_modules/css-loader");

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/code/node_modules/css-loader/lib/css-base.js'\");\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/jquery/dist/jquery.js":
/*!********************************************!*\
  !*** ./node_modules/jquery/dist/jquery.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/code/node_modules/jquery/dist/jquery.js'\");\n\n//# sourceURL=webpack:///./node_modules/jquery/dist/jquery.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/code/node_modules/style-loader/lib/addStyles.js'\");\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/vue/dist/vue.js":
/*!**************************************!*\
  !*** ./node_modules/vue/dist/vue.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/code/node_modules/vue/dist/vue.js'\");\n\n//# sourceURL=webpack:///./node_modules/vue/dist/vue.js?");

/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ./javascript/main.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./javascript/main.js */\"./javascript/main.js\");\n\n\n//# sourceURL=webpack:///multi_./javascript/main.js?");

/***/ })

/******/ });