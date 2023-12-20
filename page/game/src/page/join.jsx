// import Card from "../componen/card";
import Buttom from "../componen/buttom";
import Navbar from "../componen/navbar";


export default function Join(){
    return (
        <>
        <Navbar name='join'/>
        {/* <Card name={name} /> */}

        <div className="card bg-dark-subtle" style={{margin:"100px 100px", width:"600px"}}>

        <div className="card-body">

            <h5 className="card-title">Join</h5>

            <form action="">
            <label htmlFor="username" className="form-label">Username</label>
            <input  type="text" className="form-control" id="username" style={{width:"300px"}}/><br/>

            <Buttom name='Join' action='submit'/>
            <Buttom name='Create' action='/create'/>
            </form>

        </div>

        </div>
        </>
    )
}