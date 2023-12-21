import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    gameCode: '',
    isOpen: true,
    isOver: false,
    players: [],
    words: []
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameCode: ( state, action ) => {
            state.gameCode = action.payload
        },
        setIsOpen: ( state, action ) => {
            state.isOpen = action.payload
        },
        setisOver: ( state, action ) => {
            state.isOver = action.payload
        },
        setPlayers: ( state, action ) => {
            state.players = action.payload
        },
        setWords: ( state, action ) => {
            state.words = action.payload
        },
        setGame: (state, action) =>{
            state = action.payload
        }
        
    }
})

export const { setGameCode, setIsOpen, setisOver, setPlayers, setWords } = gameSlice.actions

export const fetchGame = (game) => async (dispatch) => {
    try {
        // console.log('masuk getgame')
        // console.log(game, 'di getgame')
        dispatch(setGameCode(game.gameCode))
        dispatch(setIsOpen(game.isOpen))
        dispatch(setisOver(game.isOver))
        dispatch(setPlayers(game.players))
        dispatch(setWords(game.words))
        
    } catch (error) {
        console.log(error)
    } 
}


export default gameSlice.reducer