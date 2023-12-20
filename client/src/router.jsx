import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import Game from "./pages/Game";
import JoinGame from "./pages/JoinGame";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/game/create',
        element: <CreateGame />
    },
    {
        path: '/game/:id',
        element: <Game />
    },
    {
        path: '/game/join',
        element: <JoinGame />
    }
])

export default router