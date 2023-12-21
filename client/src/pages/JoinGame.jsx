import { useState, useEffect } from "react"
import socket from "../socketConfig"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchGame } from "../features/gameSlice"
import Button from "../components/Button"
import Swal from "sweetalert2"

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
        // console.log(userInput)
        socket.emit('join-game', userInput)
    }
    
    useEffect(()=>{
       socket.on('updateGame', (game)=>{
        // console.log(game, 'di client')
        dispatch(fetchGame(game))
       })
       return () => {
        socket.removeAllListeners()
       }
    },[])

    useEffect(() => {
        socket.on('error', (text)=> {
            console.log(text, 'ini error di joingame')
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: text
              });
        })
    },[])

    

    useEffect(()=>{
        if(gameState.gameCode !== ""){
            navigate(`/game/${gameState.gameCode}`)
        }
    }, [gameState.gameCode])

    return(
        <>
        <div className="card bg-dark-subtle" style={{margin:"100px 100px", width:"600px"}}>
            <div className="card-body">
                <h5 className="card-title">Join</h5>
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
                <Button name='Play Now' action='submit'/>
                </form>

            </div>

        </div>
        </>
    )
}