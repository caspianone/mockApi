import express from 'express'
import cors from "cors"
import https from 'https'
import fs from 'fs'
import {fakeData} from "./account.js";

const app = express()
app.use(cors())
const port = 3001

app.get('/', (req, res) => {
    if (!req.client.authorized) {
        console.log('Request is invalid')
        console.log(req)
        return res.status(401).send('Invalid client certificate authentication.');
    }

    res.send('Hello World!')
})

app.get('/account', (req, res) => {
    if (!req.client.authorized) {
        console.log('Request is invalid')
        // console.log(req)
        // return res.status(401).send('Invalid client certificate authentication.');
    }
    
    res.send(JSON.stringify(fakeData()))
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