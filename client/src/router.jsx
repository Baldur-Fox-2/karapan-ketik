import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import Game from "./pages/Game";
import JoinGame from "./pages/JoinGame";
import Navbar from "./components/Navbar";
import About from "./pages/About";

const AppLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
)

const router = createBrowserRouter([

    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
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
            },
           
        ]
    }
])

export default router