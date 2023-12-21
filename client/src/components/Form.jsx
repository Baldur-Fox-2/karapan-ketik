import React, { useState, useRef, useEffect} from 'react'
import socket from '../socketConfig'


export default function Form({isOpen, isOver, gameCode}){
    const [userInput, setUserInput] = useState("")
    const textInput = useRef(null)

    useEffect(()=>{
        if(!isOpen){
            textInput.current.focus()
        }
    }, [isOpen])

    const resetForm = () => {
        setUserInput("");
    }
    const handleChange= e => {
        let value = e.target.value
        let lastChar = value.charAt(value.length -1)
        if(lastChar === " "){
            socket.emit('userInput', {userInput, gameId: gameCode})
            resetForm()
        } else {
            setUserInput(value)
        }
    }

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

    return(
        <>
        <div className="row my-3">
            <div className="col-sm">

            </div>
            <div className="col-sm-4">
                <form action="">
                    <div className="form-group">
                        <input type="text" readOnly={isOpen || isOver } 
                        onChange={handleChange}
                        value={userInput}
                        className='form-control'
                        ref={textInput}
                        />
                    </div>
                </form>
            </div>
            <div className="col-sm">

            </div>
        </div>
        </>
    )

}