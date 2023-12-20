import {useNavigate} from "react-router-dom"

export default function Buttom({name, action}){
    const navigate = useNavigate()
    if(action==='submit'){
        return <button className="btn btn-danger m-1" type={action} >{name}</button>
    } else {
        return <button className="btn btn-primary m-1" onClick={()=>navigate(action)} >{name}</button>
    }
}