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
    // console.log(gameState, 'di game')
    

    useEffect(()=>{
        socket.on('join-game', (games)=> {
        })
    }, [])

    useEffect(()=>{
        socket.on('updateGame', (game)=>{
         // console.log(game, 'di client')
         dispatch(fetchGame(game))
        })
        return () => {
         socket.removeAllListeners()
        }
     },[])
    
    return(
        <>
        <br />
        <br />

            <TypeRacer gameState={gameState} players={waiting.players} />
        </>
    )
}