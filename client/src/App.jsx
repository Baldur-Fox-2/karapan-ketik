import { useEffect, useRef, useState } from "react";
// import './App.css'
// import socket from "./socket";

const quote = () =>
  "Lorem elit.".split(" ");

function App() {
  // const [isConnect, setIsConnect] = useState(socket.connected);
  const getQuote = useRef(quote());
  const [userInput, setUserInput] = useState("");

  const [indexWords, setIndexWords] = useState(0);
  const [correct, setCorrect] = useState(0);

  const [done, setFinish] = useState("unfinish");

  function handleCorrectWord(value) {
    if (value.endsWith(" ")) {
      if (userInput === getQuote.current[indexWords]) {
        console.log(indexWords, "====", getQuote.current.length-1);
        if(indexWords === getQuote.current.length-1){
          setFinish("done bang");// ini langsung ke sockett
          console.log('masukkk');
        }
        setIndexWords((index) => index + 1);
        setCorrect((prevState) => prevState + 1);
        setUserInput("");
      }
      console.log(done)

    } else {
      setUserInput(value);
    }
  }

  useEffect(() => {}, []);

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <h2
            style={{
              paddingTop: "10%",
              fontFamily: "monospace",
              paddingBottom: "5%",
            }}
          >
            Karapan-Ngetik
          </h2>
        </div>
        <div className="card">
          <div className="card-header">Quote</div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>
                {getQuote.current.map((words, index) => {
                  if (index === indexWords) {
                    return (
                      <b
                        key={index}
                        style={{
                          color: "black",
                        }}
                      >
                        {words}{" "}
                      </b>
                    );
                  }
                  return <span key={index}>{words} </span>;
                })}
              </p>
              <footer className="blockquote-footer">Madam Deshinta</footer>
            </blockquote>
          </div>
        </div>
        <div
          style={{
            paddingTop: "5%",
          }}
        >

            <label
              style={{
                fontFamily: "cursive",
                fontSize: "large",
                fontWeight: "bolder",
              }}
            >
              User Type{" "}
            </label>
            <input
              className="form-control"
              onChange={(e) => handleCorrectWord(e.target.value)}
              value={userInput}
            />
       
        </div>
      </div>
    </>
  );
}

export default App;
