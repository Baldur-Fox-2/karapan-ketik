import { RouterProvider } from "react-router-dom"
import router from "./router"
// import { ThemeContext } from "./context/Theme"

function App() {

  return (
    <RouterProvider router={router}/>

  // <ThemeContext.Provider 
  //   // value=({})
  //   >
  // </ThemeContext.Provider>
  )
}

export default App
