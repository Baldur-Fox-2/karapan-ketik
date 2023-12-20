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
const e = require('express')

const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

let games = []

app.use(express.urlencoded({extended: false}))
app.use(express.json())

class Game {
    constructor(gameCode, words, isOpen, isOver, players, startTime){
        this.gameCode = gameCode,
        this.words = words,
        this.isOpen = true,
        this.isOver = false,
        this.players = [],
        this.startTime = startTime
    }
}

io.on('connect', (socket)=> {
    console.log('a user connected');

    socket.on('userInput', async({userInput,gameId}) => {
        try {
            let game = await games.find(el => el.gameCode == gameId)
            if(!game.isOpen && !game.isOver){
                let player = game.players.find(player => player.playerId === socket.id)
                let word = game.words[player.currentWordIndex]
                if(word  === userInput){
                    player.currentWordIndex++
                    if(player.currentWordIndex !== game.words.length){
                        io.to(gameId).emit('updateGame', game)
                    } else {
                        let endTime = new Date().getTime()
                        let { startTime } = game
                        player.WPM = calculateWPM(endTime, startTime, player)
                        socket.emit('done')
                        io.to(gameId).emit('updateGame', game)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('timer', async({gameId, playerId})=>{
        let countDown = 5;
        let game = await games.find(el => el.gameCode == gameId)
        let player = game.players.find(el => el.playerId === playerId)
        if(player.isPartyLeader){
            let timerId = setInterval(async()=>{
                if(countDown >= 0){
                    io.to(gameId).emit('timer', {countDown, msg: "Starting Game"})
                    countDown--
                } else {
                    game.isOpen = false
                    io.to(gameId).emit('updateGame', game)
                    startGameClock(gameId)
                    clearInterval(timerId)
                }
            }, 1000)
        }
    })


    socket.on('join-game', async({gameId, nickName}) => {
        console.log('a user joined game');
        try {
            let game = await games.find(el => el.gameCode == gameId)
            console.log(gameId)
            console.log(game.isOpen, 'ini di join-game')
            if(game.isOpen){
                socket.join(gameId)
                let player = {
                    playerId: socket.id,
                    isPartyLeader: false, 
                    nickName,
                    WPM: -1,
                    currentWordIndex: 0
                }
                game.players.push(player)
                console.log(game)
                io.to(gameId).emit('updateGame', game)
            }
        } catch (error) {
            console.log(error)
        }
    })

   
    
    socket.on('create-game', async(nickName)=>{
    try {
        
        console.log(nickName,'server')
        const gameCode = 'karapan' + uuidv4();
        const words = await randomQuote()   
        let player = {
            playerId : socket.id,
            isPartyLeader: true,
            nickName,
            WPM: -1,
            currentWordIndex: 0
        }
        console.log(player)
        let game = new Game(gameCode, words)
        game.players.push(player)
        console.log(game)
        games.push(game)
        // const game = await Game.create({words, players : [player]})
        const gameId = gameCode
        console.log(games, '==')
        socket.join(gameId)
        io.to(gameId).emit('updateGame', game)
    } catch (error) {
        console.log(error)
    }
   })

})

const startGameClock = (gameId) => {
    let game = games.find(el => el.gameCode == gameId)
    game.startTime = new Date().getTime()
    let time = 10;
    let timerId = setInterval(function gameIntervalFunc(){
        const formatTime = calculateTime(time)
        if(time >= 0){
            io.to(gameId).emit('timer', {countDown: formatTime, msg: "Timer remaining"})
            time--
        } else {
            (async()=> {
                let endTime = new Date().getTime()
                let game = games.find(el => el.gameCode == gameId)
                let {startTime} = game;
                game.isOver = true
                game.players.forEach((player, index)=>{
                    if(player.WPM === -1){
                        game.players[index].WPM = calculateWPM(endTime, startTime, player)
                    }
                })
                io.to(gameId).emit('updateGame', game)
                clearInterval(timerId)
            })()

        }
        return gameIntervalFunc
    },1000)
}

const calculateTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`

}

const calculateWPM = (endTime, startTime, player) => {
    let numberOfWords = player.currentWordIndex
    const timeInSecods = (endTime - startTime) / 1000
    const timeInMinutes = timeInSecods / 60;
    const WPM = Math.floor(numberOfWords/timeInMinutes)
    return WPM
}



httpServer.listen(PORT, ()=> {
    console.log('Listening to port: ' + PORT)
})
