const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const request = require("request")
const path = require("path")

app.use(express.static("./public"))

app.get("/prox", (req, res) => {
	// TODO only allow github and raw github
	if (req.query.url) {
		request(req.query.url, function (error, response, body) {
			res.send(body);
		});
	} else {
		res.send("no params");
	}
})


app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/index.html"));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
