import { useState, useEffect } from "react"
import socket from "../socketConfig"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchGame } from "../features/gameSlice"
import Button from "../components/Button"


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
        console.log(game, "<<<<<")
       })
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

                <h5 className="card-title">Create</h5>

                <form onSubmit={handleSubmit}>
                <div className="form-grup">
                            <div htmlFor="nickname">Enter Nickname</div>
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