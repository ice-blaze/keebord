import $ from "jquery";

function addShiftActivation() {
		$("#keyboard .left-shift, #keyboard .right-shift").click(() => {
				$(".shifted").toggle()
				$(".unshifted").toggle()
		})
}

export function drawVirtualKeyboard(keyboardLayout) {
		const appendLine = (line) => {
				for(const tuple of line){
						$("#keyboard").append(`<li><span class="unshifted">${tuple[0]}</span><span class="shifted">${tuple[1]}</span></li>`)
				}
		}
		appendLine(keyboardLayout[0])
		$("#keyboard").append(`<li class="delete lastitem">&#x232b;</li>`)
		$("#keyboard").append(`<li class="tab">↹</li>`)
		appendLine(keyboardLayout[1])
		$("#keyboard").append(`<li class="capslock">&#8682;</li>`)
		appendLine(keyboardLayout[2])
		$("#keyboard").append(`<li class="return lastitem">&#9166;</li>`)
		$("#keyboard").append(`<li class="left-shift">&#8679;</li>`)
		appendLine(keyboardLayout[3])
		$("#keyboard").append(`<li class="right-shift lastitem">&#8679;</li>`)
		$("#keyboard").append(`<li class="space lastitem">&nbsp;</li>`)

		addShiftActivation()
}
