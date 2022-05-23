import fs from 'fs'
import https from 'https'

const req = https.request(
    {
        hostname: '127.0.0.1',
        port: 3001,
        path: '/',
        method: 'GET',
        cert: fs.readFileSync('client.crt'),
        key: fs.readFileSync('client.key'),
        ca: fs.readFileSync('ca.crt')
    },
    res => {
        res.on('data', function(data) {
            console.log(`I got data ${data}`)
        });
    }
);

req.end();