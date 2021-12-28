const https = require("https")
const fs = require("fs")

const sslKeyPath = "/etc/ssl/private/selfsigned.key"
const sslCertPath = "/etc/ssl/certs/selfsigned.crt"
const cipherSuite = "ECDHE-RSA-AES128-GCM-SHA256"

const options = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath),
    minVersion: "TLSv1.2",
    maxVersion: "TLSv1.3",
    cipher: cipherSuite,
}

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.write("hello\n");
    res.end("bye");
}).listen(443, () => console.log("Server successfully started"))
