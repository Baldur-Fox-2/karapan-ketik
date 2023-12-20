import Button from "../components/Button"

export default function Home(){
    
    return(
        <>
        <div className="card d-flex bg-dark-subtle" style={{width:"45rem", height:"500px", margin:"60px auto", padding:"50px"}}>
            <div className="mb-3 p-7">
            <center><h1>Karapan Ketik</h1></center>
            </div>

            <div className="mb-3 ">
            <center>
                <img style={{blockSize:"150px"}} src="https://i.ibb.co/FXHCHjT/game-ketik-crop.png"/>
            </center>
            </div>
            <div className="row">
            <div className="mb-3 p-2"> 
                <center>
                <Button name='Create' action={`/game/create`}/>
                <Button name='Join' action={`/game/join`}/>
                </center>   
            </div>
            </div>

        </div>
        </>
    )
}