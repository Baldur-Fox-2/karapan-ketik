import { useNavigate } from "react-router-dom";
import Buttom from "../../../../karapan-ngetik/navbarComponen/buttom";

export default function Navbar({name}){
    const navigate = useNavigate()
    return(
        <>
        <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">

            {/* <div className="d-flex flex-row justify-content-evenly">
                <div className="mb-1 p-1">
                    <img src="/game-ketik-crop.png" style={{height:"35px"}}/>
                </div>
                <div className="mb-1 p-1">
                    <a className="navbar-brand" type="button">Karap Ketik</a>
                </div>
            </div> */}

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