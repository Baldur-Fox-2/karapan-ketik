import React from "react";

export default function ProgressBar({player, players, wordsLength}){
    
    
    const calculatePercentage = (player, wordsLength) => {
        if(player.currentWordIndex !== 0){
            return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + "%"
        }
        return 0
    }

    const percentage = calculatePercentage(player, wordsLength)

    return(
       
            <div>
                {
                    <>
                        <h5 className="text-letf">{player.nickName}</h5>
                        <div className="progress my-1" key={player.id}>
                            <div className="progress-bar"
                                role="progressbar"
                                style={{width: percentage}}
                                >
                                {percentage}
                            </div>
                        </div>
                    </>
                }
                {
                    players.map(playerObj => {
                        const percentage = calculatePercentage(playerObj, wordsLength)
                        return playerObj.playerId !== player.playerId ?
                        <>
                            <h5 className="text-letf">{playerObj.nickName}</h5>
                            <div className="progress my-1" key={playerObj.id}>
                                <div className="progress-bar"
                                    role="progressbar"
                                    style={{width: percentage}}
                                    >
                                    {percentage}
                                </div>
                            </div>
                        </> : null
                        
                    })
                }
            </div>
     
    )

}