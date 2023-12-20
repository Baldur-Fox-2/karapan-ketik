import React from 'react'

export default function DisplayWords({words, player}){

    const typedCurrentlyStyle = {
        "backgroundColor" : "#34eb77"
    }

    const currentStyle = {
        "textDecoration" : "underline"
    }

    const getTypedWords = (words, player) => {
        let typedWords = words.slice(0, player.currentWordIndex)
        typedWords = typedWords.join(" ")
        return <span style={typedCurrentlyStyle}> {typedWords} </span>
    }

    const getCurrentWord = (words, player) => {
        return <span style={currentStyle}>{words[player.currentWordIndex]}</span>
    }

    const getWordsToBeTyped = (words, player) => {
        let wordsToBeTyped = words.slice(player.currentWordIndex + 1, words.length)
        wordsToBeTyped = wordsToBeTyped.join(" ")
        return <span> {wordsToBeTyped} </span>
    }
     
    return(
        <>
            {getTypedWords(words, player)}
            {getCurrentWord(words, player)}
            {getWordsToBeTyped(words, player)}
        </>
    )
}