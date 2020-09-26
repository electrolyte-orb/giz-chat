const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.use(require("express").static("."))
app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

let users = []

io.on("connection", (socket) => {
	socket.on("newUsr", data => {
		users.push(data)
	})
	socket.on("chat-msg", (data) => {
		socket.broadcast.emit("chat-msg", data)
    })
})

http.listen((process.env.PORT || 8000), () => {
	console.log(`Your server is started on port 8000`);
});
