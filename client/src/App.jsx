import { useEffect, useRef, useState } from "react";
// import './App.css'
import socket from "./socket";

const quote = () =>
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae dolores soluta praesentium doloribus id dolorum quam facere aperiam aliquam, consequatur quia ex fuga quisquam deleniti voluptate voluptatem temporibus voluptates ratione?".split(
    " "
  );

function App() {
  // const [isConnect, setIsConnect] = useState(socket.connected);
  const getQuote = useRef(quote());
  const [userInput, setUserInput] = useState("");

  const [indexWords, setIndexWords] = useState(0);
  const [correct, setCorrect] = useState(null)


  function handleCorrectWord(value) {
    if (value.endsWith(" ")) {
      if (userInput === getQuote.current[indexWords]) {
        setIndexWords((index) => index + 1);
        setUserInput("");
      }
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
                          font
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
          <form className="mb-3" onSubmit="">
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
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
