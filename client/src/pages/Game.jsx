import { useState, useEffect } from "react"
import socket from "../socketConfig"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchGame } from "../features/gameSlice"
import TypeRacer from "../components/TypeRacer"


export default function Game(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const gameState = useSelector(state => {
        return state.game
    })
    const waiting = gameState
    console.log(gameState, 'di game')

    // const user = JSON.parse(localStorage.getItem('userJoin'));
    
    useEffect(()=>{
        console.log('<><><><>')
        socket.emit('join-test')

        // socket.on('updateGame', (game)=>{
        //     console.log(game, 'di client <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        //     dispatch(fetchGame(game))
        //    })
        
     },[])

    useEffect(()=>{
        // if(localStorage.userJoin){
        //     socket.emit('join-game')
        // }
        
    }, [])
    
    return(
        <>
        {
            waiting.players.map(player => {
                return <h2>Player : {player.nickName}</h2>
            })    
        }
            <TypeRacer gameState={gameState} player={waiting.players} />
        </>
    )
}