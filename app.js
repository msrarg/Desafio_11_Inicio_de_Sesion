const Server = require('./models/server.js');

const server = new Server();
server.listen();

// npm install body-parser connect-mongo cookie-parser dotenv express express-handlebars express-session handlebars