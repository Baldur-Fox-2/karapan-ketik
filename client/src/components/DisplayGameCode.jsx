import React, {useRef, useState} from "react";

export default function DisplayGameCode({gameCode}){

    const [copySuccess, setCopySuccess] = useState(false)
    const textInputRef = useRef(null)

    function handleCopy(e){
        textInputRef.current.select()
        document.execCommand("copy")
        setCopySuccess(true)
    }
    return( 
        <div className="row" my-3 text-center>
            <div className="col-sm"></div>
            <div className="col-sm-8">
                <h4>Share this Code</h4>
                        <div className="input-group mb-3">
                        <input type="text"
                        ref={textInputRef}
                        value={gameCode}
                        readOnly
                        className="form-control"
                        />
                        <div className="input-group-append">
                        <button className="btn btn-outline-secondary"
                        onClick={handleCopy}
                        type="button">Copy Game Code</button>
                        </div>
                </div>
                {copySuccess ? <div className="aler alert-success" role="alert">Successfully Copied Game Code</div>  : null}
            </div>
            <div className="col-sm"></div>
        </div>
    )
}