import { useState, useEffect } from "react"
import socket from "../socketConfig"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchGame } from "../features/gameSlice"


export default function CreateGame(){
    const [nickName, setNickName] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const gameState = useSelector(state => {
        return state.game
    })


    function handleChange(e){
        setNickName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        socket.emit('create-game', nickName)
    }
    

    useEffect(()=>{
       socket.on('updateGame', (game)=>{
        dispatch(fetchGame(game))
       })
    },[])

    useEffect(()=>{
        if(gameState.gameCode !== ""){
            navigate(`/game/${gameState.gameCode}`)
        }
    }, [gameState.gameCode])

    return(
        <>
        <div className="row">
            <div className="col-sm">
                <div className="col-sm-8">
                    <h1 className="text-center">Create game</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-grup">
                            <div htmlFor="nickname">Enter Nickname</div>
                            <input type="text" name="nickName"
                            onChange={handleChange}
                            className="form-control"
                            />
                        </div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}