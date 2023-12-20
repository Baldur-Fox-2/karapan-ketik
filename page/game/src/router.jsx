import { createBrowserRouter } from "react-router-dom";
import Home from "./page/home";
import Create from "./page/create";
import Join from "./page/join";
import Panduan from "./page/panduan";

const router = createBrowserRouter([
    {path:'/', element:<Home/>},
    {path:'/create/:username', element:<Create/>},
    {path:'/join/:username', element:<Join/>},
    {path:'/panduan', element:<Panduan/>},
])

export default router