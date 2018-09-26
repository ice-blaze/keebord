import $ from "jquery";

export const clearErrors = () => {
	$("#credits-error").empty()
}

const formatSeconds = (seconds) => {
  const modSeconds = 60
	const modulatedSeconds = String(Math.round(seconds % modSeconds))

  const oneDigitLength = 1
	if (modulatedSeconds.length === oneDigitLength) {
		return "0" + modulatedSeconds
	}
	return modulatedSeconds
}

export const displayNoMoreCredits = (resetMilisecs) => {
	clearErrors()
	const now = Date.now()
	const remainingMiliseconds = resetMilisecs - now
  const convertToSeconds = 1000
	const remainingSec = remainingMiliseconds / convertToSeconds
  const convertToMinutes = 60
	const remainingMin = remainingSec / convertToMinutes

	$("#credits-error").append(`
<div class="alert alert-danger alert-dismissible fade show" role="alert">
	You reach the <strong>rate limite!</strong> You have to wait: ${Math.floor(remainingMin)}m${formatSeconds(remainingSec)}s  <br>

	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
</div>
	`)
}
