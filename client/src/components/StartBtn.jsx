import React, { useState } from "react";
import socket from "../socketConfig";

export default function StartBtn({player, gameCode}){
    const [showBtn, setShowBtn] = useState(true)
    const {isPartyLeader} = player


    function clickHanlder(e){
        socket.emit('timer', {playerId : player.playerId, gameId : gameCode} )
        setShowBtn(false)
    }
    return(
        isPartyLeader && showBtn ? <button className="btn btn-primary" type="button" onClick={clickHanlder}>Start Game</button> : null
    )

}
