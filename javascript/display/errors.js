import $ from "jquery";

export const clearErrors = () => {
	$("#credits-error").empty()
}

const formatSeconds = (seconds) => {
	const modulatedSeconds = Math.round(seconds % 60) + ""
	const stringSeconds = modulatedSeconds.toString()

	if (stringSeconds.length === 1) {
		return "0" + modulatedSeconds
	}
	return modulatedSeconds
}

export const displayNoMoreCredits = (resetMilisecs) => {
	clearErrors()
	const now = Date.now()
	const remainingMiliseconds = resetMilisecs - now
	const remainingSec = remainingMiliseconds / 1000
	const remainingMin = remainingSec / 60

	$("#credits-error").append(`
<div class="alert alert-danger alert-dismissible fade show" role="alert">
	You reach the <strong>rate limite!</strong> You have to wait: ${Math.floor(remainingMin)}m${formatSeconds(remainingSec)}s  <br>

	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
</div>
	`)
}
