const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const request = require("request")
const cors = require('cors')
const path = require('path')

// app.use(function(req, res, next) {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
// 	res.setHeader("Allow", "*");
// 	//res.setHeader('Content-Type', 'application/json');
// 	next();
// });


// TODO move all in public
app.use(express.static('./'))
//app.use(cors())


app.get('/prox', (req, res) => {
	if(req.query.url) {
		// TODO only allow github and raw github
		request(req.query.url, function (error, response, body) {
			res.send(body);
		});
	} else {
		res.send("no params");
	}
})


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
