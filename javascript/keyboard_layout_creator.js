import $ from "jquery";

function getKeyboardLayout(frequencyDictionary) {
		console.log(frequencyDictionary)
}

const qwerty = [
		[["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"],],
		[["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["[", "{"], ["]", "}"], ["\\", "|"],],
		[["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", "\""],],
		[["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"],],
]

export function setKeyboardLayout(frequencyDictionary) {
		const appendLine = (line) => {
				for(const tuple of line){
						$("#keyboard").append(`<li><span class="unshifted">${tuple[0]}</span><span class="shifted">${tuple[1]}</span></li>`)
				}
		}
		appendLine(qwerty[0])
		$("#keyboard").append(`<li class="delete lastitem">&#x232b;</li>`)
		$("#keyboard").append(`<li class="tab">↹</li>`)
		appendLine(qwerty[1])
		$("#keyboard").append(`<li class="capslock">&#8682;</li>`)
		appendLine(qwerty[2])
		$("#keyboard").append(`<li class="return lastitem">&#9166;</li>`)
		$("#keyboard").append(`<li class="left-shift">&#8679;</li>`)
		appendLine(qwerty[3])
		$("#keyboard").append(`<li class="right-shift lastitem">&#8679;</li>`)
		$("#keyboard").append(`<li class="space lastitem">&nbsp;</li>`)
}
