import { useNavigate } from "react-router-dom";
import Buttom from "./buttom";

export default function Navbar({name}){
    const navigate = useNavigate()
    return(
        <>
        <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">

            <img onClick={()=>navigate('/')} type="button" src="/game-ketik-crop.png" style={{height:"35px"}}/>
            
            <a className="navbar-brand" type="button" onClick={()=>navigate('/')}>Karapan Ketik</a>

            <a className="navbar-brand" type="button" onClick={()=>navigate('/panduan')}>Panduan</a>

        {/* <div className="row">
          <div className="mb-3 p-2">
            
            <center>
            <Buttom name='Create' action='/create'/>
            <Buttom name='Join' action='/join'/>
            </center>
            
          </div>
        </div> */}

        </div>
        
        </nav>
        </>
    )
}