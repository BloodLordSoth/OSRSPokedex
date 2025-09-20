import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { scrape } from './index.js'

const app = express()
const PORT = 4000
app.use(express.json())
app.use(cors())
const __file = fileURLToPath(import.meta.url)
const __dir = path.dirname(__file)
app.use(express.static(path.join(__dir, 'frontend')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dir, 'frontend', 'index.html'))
})

app.post('/bosses', async (req, res) => {
    const bossname = req.body.bossname

    if (!bossname) return res.sendStatus(401);

    try {
        const file = await scrape(`https://oldschool.runescape.wiki/w/${bossname}`)
        res.status(200).json({ file: file })
    }
    catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
})