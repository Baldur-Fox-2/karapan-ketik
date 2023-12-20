import { useState } from "react"
import Buttom from "./buttom"

export default function Card({name}){
  const [username,setUsername] = useState('')

  return (
  <>
<div className="card bg-dark-subtle" style={{margin:"100px 100px"}}>

  <div className="card-body">

    <h5 className="card-title">{name}</h5>

    <form action="">
      <label htmlFor="username" className="form-label">Username</label>
      <input onChange={(e)=> setUsername(e.target.value)} type="text" className="form-control" id="username" style={{width:"300px"}}/><br/>

      <Buttom name={name} action='submit'/>
    </form>

  </div>

</div>
    </>
    )
}