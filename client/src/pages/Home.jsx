import { useNavigate } from "react-router-dom"
import socket from '../socketConfig'
import { useEffect, useState } from "react"


export default function Home(){
    const navigate = useNavigate()

    return (
      <>
      <div className="text-center">
        <h1>Welcome to Karapan Ketik</h1>
        <button type="button" onClick={()=> navigate('/game/create')} >Create Game</button>
      </div>
      </>
    )
}