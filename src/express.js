import express from 'express'
import https from 'https'
import fs from 'fs'
import {fakeData} from "./account.js";

const app = express()
const clientAuthMiddleware = () => (req, res, next) => {
    if (!req.client.authorized) {
        console.log('unauthorized')
        // return res.status(401).send('Invalid client certificate authentication.');
    }
    return next();
};

app.use(clientAuthMiddleware());
const port = 3001

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/account', (req, res) => {
    res.send(JSON.stringify(fakeData(), null, 2))
})




https
    .createServer(
        {
            // ...
            cert: fs.readFileSync('../server.crt'),
            key: fs.readFileSync('../server.key'),
            // ...
        },
        app
    )
    .listen(port);