require("dotenv/config");
const app = require("./src/server");

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server up on port:", port);
});


/*
const Server = require('./src/server');

const server = new Server();
server.listen();
*/