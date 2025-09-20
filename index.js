import puppeteer from 'puppeteer'

export async function scrape(url){
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    })
    const page = await browser.newPage()
    await page.goto(url)

    const img = await page.$eval('table.infobox img', res => res.src)
    const data = await page.$$eval('table tbody tr', res => res.map(row => {
        const cells = Array.from(row.querySelectorAll('td'))
        return cells.map(cell => cell.textContent.trim())
    }))

    const arr = []
    arr.push({ Picture: img })

    for (let i = 69; i < 145; i++){
        const info = data[i]
        const name = info[1]
        const quant = info[2]
        const rarity = info[3]
        const price = info[4]
        arr.push({ Name: name, Quantity: quant, Rarity: rarity, Price: price })
    }
    
    
    //console.log(arr)
    await browser.close()
    return arr
}
//scrape('https://oldschool.runescape.wiki/w/Sarachnis')