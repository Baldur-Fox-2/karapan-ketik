import { useState, useEffect, useRef } from "react";
import socket from "../socketConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGame } from "../features/gameSlice";

export default function TypeRacer({ player }) {
  const [userInput, setUserInput] = useState("");
  const [indexWords, setIndexWords] = useState(0);
  const [finished, setFinish] = useState("masuk");
  const [winner, setWinner] = useState("");
  const dispatch = useDispatch();
  let words = useSelector((state) => {
    return state.game.words;
  });

  const getWords = () => {
    return words.split(" ");
  };

  const useWords = useRef(getWords());

  function handleCorrectWord(value) {
    if (value.endsWith(" ")) {
      if (userInput === useWords.current[indexWords]) {
        setUserInput("");
        if (indexWords === useWords.current.length - 1) {
          setFinish("done bang"); // ini langsung ke sockett
          setWinner(player[0].nickName);
          socket.emit("status", player[0].nickName);
        }
        setIndexWords((index) => index + 1);
        // setCorrect((prevState) => prevState + 1);
        setUserInput("");
      }
    } else {
      setUserInput(value);
    }
  }

  useEffect(() => {
    socket.on("updateGame", (game) => {
      dispatch(fetchGame(game));
    });
  }, []);

  useEffect(() => {
    socket.on("connect");
    socket.on("winner", (data) => {
      setFinish((prevState) => [...prevState, data]);
    });
  }, []);

  

  return (
    <>
      <div className="continer-fluid">
        <h1>Winner: {winner}</h1>
        <div className="d-flex justify-content-center">
          <h2
            style={{
              paddingTop: "2%",
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
                {useWords?.current?.map((words, index) => {
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
