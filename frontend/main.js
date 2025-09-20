const form = document.getElementById('form')
const imgBox = document.getElementById('imgBox')
const input = document.getElementById('input')
const textBox = document.getElementById('textBox')
const header = document.getElementById('middiv')
const title = document.createElement('h1')

async function submit(){
    if (input.value.length === 0){
        return
    }

    const dataObj = {
        bossname: input.value.replace(' ', '_')
    }

    const res = await fetch('/bosses', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj)
    })


    if (!res.ok){
        input.value = ''
        window.alert('There was a server issue')
        return
    }

    
    title.textContent = input.value
    header.appendChild(title)
    input.value = ''

    imgBox.style.display = 'inline'
    textBox.style.display = 'inline'
    const data = await res.json()
    const img = document.createElement('img')
    img.src = data.file[0].Picture
    img.classList.add('content')
    imgBox.appendChild(img)
    
    const table = document.createElement('table')
    data.file.forEach(item => {
        const rows = document.createElement('tr')
        rows.innerHTML = `
        <td><p class="item">Name:</p>${item.Name}</td>
        <td><p class="item">Quantity:</p>${item.Quantity}</td>
        <td><p class="item">Rarity:</p>${item.Rarity}</td>
        <td><p class="item">Price:</p>${item.Price}</td>
        `
        table.appendChild(rows)
        textBox.appendChild(table)
    })

}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    submit()
    imgBox.innerHTML = ''
    imgBox.style.display = 'none'
    textBox.style.display = 'none'
    title.textContent = ''
    textBox.innerHTML = ''
})