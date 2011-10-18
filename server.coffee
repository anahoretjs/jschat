router = require('./lib/routes').router

require("http").createServer(router).listen(3000)
