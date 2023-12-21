const axios = require('axios')

async function randomQuote(){
    const {data} = await axios.get("https://api.quotable.io/random")
    const quote = data.content.split(" ")
    return quote
}

module.exports = randomQuote