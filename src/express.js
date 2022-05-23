import express from 'express'
import cors from "cors"
import https from 'https'
import fs from 'fs'

const app = express()
app.use(cors())
const port = 3001

app.get('/', (req, res) => {
    res.send('Hello World!')
})


https
    .createServer(
        {
            // ...
            cert: fs.readFileSync('service.crt'),
            key: fs.readFileSync('service.key'),
            // ...
        },
        app
    )
    .listen(port);