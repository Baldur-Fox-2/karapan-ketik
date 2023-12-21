import { useState, useEffect, useRef } from "react";
import socket from "../socketConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGame } from "../features/gameSlice";
import StartBtn from "../components/StartBtn"
import CountDown from "../components/CountDown"
import DisplayWords from "../components/DisplayWords"
import Form from '../components/Form'
import ProgressBar from '../components/ProgressBar'
import ScoreBoard from '../components/ScoreBoard'
import DisplayGameCode from '../components/DisplayGameCode'


export default function TypeRacer({gameState}) {
 const navigate = useNavigate()
 
  const findPlayer = players => {
    return players.find(player => player.playerId === socket.id)
  }

  const { gameCode, players, words, isOpen, isOver } = gameState
  const player = findPlayer(players)
  // console.log(player)
 


  return (
    <>
      <div className="text-center">
        <DisplayWords words={words} player={player} />
        <ProgressBar players={players} player={player} wordsLength={words.length} />
        <Form isOpen={isOpen} isOver={isOver} gameCode={gameCode} />
        <CountDown />
        <StartBtn player={player} gameCode={gameCode} />
        <br />
        <DisplayGameCode gameCode={gameCode} />
        <ScoreBoard players={players} />
      </div>
    </>
  );
}
