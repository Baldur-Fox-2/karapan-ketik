// import Card from "../componen/card";
import Buttom from "../componen/buttom";
import Navbar from "../componen/navbar";


export default function Create(){
    return(
        <>
        <Navbar name='create'/>
        {/* <Card name={name}/> */}
<div className="card bg-dark-subtle" style={{margin:"100px 100px", width:"600px"}}>

  <div className="card-body">

    <h5 className="card-title">Create</h5>

    <form action="">
      <label htmlFor="username" className="form-label">Username</label>
      <input type="text" className="form-control" id="username" style={{width:"300px"}}/><br/>

      <Buttom name='Create' action='submit'/>
      <Buttom name='Join' action='/join' />
    </form>

  </div>

</div>
        </>
    )
}