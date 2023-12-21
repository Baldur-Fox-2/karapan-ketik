import React from 'react'

export default function DisplayWords({words, player}){

    const typedCurrentlyStyle = {
        "backgroundColor" : "#34eb77",
        "textColor" : 'red'
    }

    const currentStyle = {
        "textDecoration" : "underline"
        
    }

    const getTypedWords = (words, player) => {
        let typedWords = words.slice(0, player.currentWordIndex)
        typedWords = typedWords.join(" ")
        console.log(typedWords, "<<<<<<TYPE>>>>>>>");
        return <span style={typedCurrentlyStyle}> {typedWords} </span>
    }

    const getCurrentWord = (words, player) => {
        return <p style={currentStyle}>{words[player.currentWordIndex]}</p>
    }

    const getWordsToBeTyped = (words, player) => {
        let wordsToBeTyped = words.slice(player.currentWordIndex + 1, words.length)
        wordsToBeTyped = wordsToBeTyped.join(" ")
        console.log(wordsToBeTyped, "<<<<<<TYPE>>>>>>>");
        return <span> {wordsToBeTyped} </span>
        
        
    }
     
    return(
        <>
        <div className="card">
        <div className="card-header">Quote</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            
            {getTypedWords(words, player)}
            {getCurrentWord(words, player)}
            {getWordsToBeTyped(words, player)}
            <footer className="blockquote-footer pt-3">Madam Deshinta</footer>
          </blockquote>
        </div>
      </div>
        
         
          
        </>
    )
}