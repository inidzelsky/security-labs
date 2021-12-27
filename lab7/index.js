const https = require("https")
const fs = require("fs")

const options = {
    key: fs.readFileSync("/etc/ssl/private/selfsigned.key"),
    cert: fs.readFileSync("/etc/ssl/certs/selfsigned.crt"),
    minVersion: "TLSv1.2",
    maxVersion: "TLSv1.2",
}

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.write("hello\n");
    res.end("bye");
}).listen(443, () => console.log("Server successfully started"))
