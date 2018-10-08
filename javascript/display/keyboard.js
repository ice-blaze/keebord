import $ from "jquery";

const addShiftActivation = () => {
	$("#keyboard .left-shift, #keyboard .right-shift").click(() => {
		$(".shifted").toggle()
		$(".unshifted").toggle()
	})
}

const appendLine = (line) => {
	const VAL = 0
	const KEY = 1
	let result = ""
	for (const tuple of line) {
		// select last keyboard-row
		// TODO add tests with fake keyboard
		result += `<div class="key"><span>${tuple[KEY]}<br/>${tuple[VAL]}</span></div>`
	}
	return result
}

const capsLockKey = `
<div class='key lowercase lower-left extra-size-two'>
  <span class='lower-row-text'>caps lock</span>
  <span class='absolute-left caps-dot'>&bull;</span>
</div>
`

const backspaceKey = `
<div class='key extra-size lowercase lower-right'>
  <span class='lower-row-text'>backspace</span>
</div>
`

const enterKey = `
<div class='key extra-size-two lowercase lower-right'>
  <span class='lower-row-text'>enter</span>
</div>
`

const tabKey = `
<div class='key extra-size lowercase lower-left'>
  <span class='lower-row-text'>tab</span>
</div>
`

const rightShiftKey = `
<div class='key double-size lowercase lower-right'>
  <span class='lower-row-text'>shift</span>
</div>
`

const leftShiftKey = `
<div class='key double-size lowercase lower-left'>
  <span class='lower-row-text'>shift</span>
</div>
`

const spaceKeyRow = `
<div class='keyboard-row bottom-row'>
  <div class='key'></div>
</div>
`

const newRow = (id, content) => `<div class='keyboard-row' id='${id}'>${content}</div>`

const createFirstRow = (row) => {
	return newRow(
		"firstRow",
		appendLine(row) + backspaceKey
	)
}

const createSecondRow = (row) => {
	return newRow(
		"secondRow",
		tabKey +
		appendLine(row)
	)
}

const createThirdRow = (row) => {
	return newRow(
		"thirdRow",
		capsLockKey +
			appendLine(row) +
			enterKey
	)
}

const createFourthRow = (row) => {
	return newRow(
		"fourthRow",
		leftShiftKey +
			appendLine(row) +
			rightShiftKey
	)
}

export const drawKeyboard = (keyboardLayout) => {
	const keyboard = $("#keyboard")
	keyboard.empty()

	const keyboardDom = createFirstRow(keyboardLayout.firstRow) +
		createSecondRow(keyboardLayout.secondRow) +
		createThirdRow(keyboardLayout.thirdRow) +
		createFourthRow(keyboardLayout.fourthRow) +
		`${spaceKeyRow}</div>`

	keyboard.append(keyboardDom)
	addShiftActivation()
}

export const drawLoading = () => {
	// $("#find_files").append("Loading...")
	$("#find_files").append("<div class='lds-dual-ring'></div>")
}
