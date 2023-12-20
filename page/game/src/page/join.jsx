// import Card from "../componen/card";
import { useParams } from "react-router-dom";
import Buttom from "../componen/buttom";
import Navbar from "../componen/navbar";


export default function Join(){
    const {username}= useParams()

    return (
        <>
        <Navbar/>
        {/* <Card name={name} /> */}

        <div className="card bg-dark-subtle" style={{margin:"100px 100px", width:"600px"}}>

        <div className="card-body">

            <h5 className="card-title">Join</h5>

            <form action="">
            <label htmlFor="username" className="form-label">Username</label>
            <input  type="text" className="form-control" id="username" style={{width:"300px"}} defaultValue={username}/><br/>

            <Buttom name='Play Now' action='submit'/>
            <Buttom name='Create' action={!username ? '/':`/create/${username}`}/>
            </form>

        </div>

        </div>
        </>
    )
}