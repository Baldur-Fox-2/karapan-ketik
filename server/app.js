const express = require('express')
const app = express()
const socket = require('socket.io')
const { createServer } = require('http')
const { Server } = require("socket.io") 
const httpServer = createServer(app)
const cors = require('cors')
const PORT = 3000
const { v4: uuidv4 } = require('uuid');
// const { Game } = require('./models')
const { default: axios } = require('axios')
const randomQuote = require('./quotable')
const { finished } = require('stream')

const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

let games = []

app.use(express.urlencoded({extended: false}))
app.use(express.json())

class Game {
    constructor(gameCode, words, isOpen, isOver, players){
        this.gameCode = gameCode,
        this.words = words,
        this.isOpen = true,
        this.isOver = false,
        this.players = []
    }
}

io.on('connect', (socket)=> {
    console.log('a user connected');
    socket.on('join-game', async({gameId, nickName}) => {
        console.log('a user joined game');
        try {
            let game = games.find(el => el.gameCode == gameId)
            console.log(gameId)
            console.log(game.isOpen, 'ini di join-game')
            if(game.isOpen){
                
                let player = {
                    socketId: socket.id,
                    nickName
                }
                game.players.push(player)
                console.log(game)
                io.emit('updateGame', game)
            }
        } catch (error) {
            console.log(error)
        }
    })

    // socket.on('join-test', async() => {
    //     console.log('a user joined game');
    //     try {
    //     console.log(socket.id)
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })
    
    socket.on('create-game', async(nickName)=>{
    try {
        
        console.log(nickName,'server')
        const gameCode = 'karapan' + uuidv4();
        const words = await randomQuote()   
        let player = {
            playerId : socket.id,
            isPartyLeader: true,
            nickName
        }
        console.log(player)
        const newGame = new Game(gameCode, words)
        newGame.players.push(player)
        console.log(newGame)
        games.push(newGame)

        // const game = await Game.create({words, players : [player]})
        
        const gameId = gameCode
        console.log(games, '==')

        io.emit('updateGame', newGame)
    } catch (error) {
        console.log(error)
    }
   })

   socket.on('winner-user', async(winner) => {
    io.emit("winner", winner)
   })
})



httpServer.listen(PORT, ()=> {
    console.log('Listening to port: ' + PORT)
})

