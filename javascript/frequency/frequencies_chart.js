import $ from "jquery"
import Chart from "chart.js"

export const updateFrequenciesChart = (frequenciesDictionary) => {
	const ctx = document.getElementById("frequenciesChart").getContext("2d");
	const myChart = new Chart(ctx, {
		type: "horizontalBar",
		data: {
			labels: frequenciesDictionary.map(val => val[0]), // eslint-disable-line no-magic-numbers
			datasets: [
				{
					label: "# of apparitions",
					data: frequenciesDictionary.map(val => val[1]), // eslint-disable-line no-magic-numbers
					borderWidth: 1,
					backgroundColor: frequenciesDictionary.map(
						_ => "rgba(239, 67, 67, 0.9)" // eslint-disable-line no-unused-vars
					),
				},
			],
		},
		options: {
			onHover: (event) => {
				const activePoints = myChart.getElementsAtEvent(event)[0] // eslint-disable-line no-magic-numbers
				if (activePoints) {
					const letter = activePoints._model.label // eslint-disable-line no-underscore-dangle
					const flashClassRemovalTime = 100
					const selector = $(".letter-" + letter.charCodeAt(0)) // eslint-disable-line no-magic-numbers
					selector.removeClass("flash")
					setTimeout(() => {
						selector.addClass("flash")
					}, flashClassRemovalTime)
				}
			},
		},
	})
}
