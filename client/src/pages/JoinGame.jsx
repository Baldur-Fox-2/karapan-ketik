import { useState, useEffect } from "react"
import socket from "../socketConfig"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchGame } from "../features/gameSlice"


export default function JoinGame(){
    const [userInput, setUserInput] = useState({
        gameId: '',
        nickName: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const gameState = useSelector(state => {
        return state.game
    })
    // console.log(gameState, '--------')

    function handleChange(e){
        const { name, value } = e.target
        setUserInput({...userInput, [name]: value})
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(userInput)
        socket.emit('join-game', userInput)
    }
    
    useEffect(()=>{
       socket.on('updateGame', (game)=>{
        // console.log(game, 'di client')
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
                    <h1 className="text-center">Join game</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-grup">
                            <div htmlFor="gameId">Enter Game ID</div>
                            <input type="text" name="gameId"
                            onChange={handleChange}
                            className="form-control"
                            />
                            <div htmlFor="nickName">Enter Nickname</div>
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