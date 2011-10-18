bee = require 'beeline'

router = bee.route
  "r`^/client/(.*)$`":  bee.staticDir('./client', { '.txt': 'text/plain', '.js': 'text/javascript' })
  "/robots.txt":        bee.staticFile("./public/robots.txt", "text/plain")

require("http").createServer(router).listen(3000)
