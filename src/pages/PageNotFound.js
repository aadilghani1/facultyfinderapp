import React, { useState } from "react";
import Particles from "react-particles-js";
import Typewriter from "typewriter-effect";
import Tic from "../TicTacToe/Tic";

function PageNotFound() {
  const [toggle, setToggle] = useState(false);
  return (
    <div style={{ background: "#fff5f8" }}>
      <Particles
        params={{
          particles: {
            number: {
              value: 50,
            },
            color: {
              value: "#FF9F4A",
            },
            size: {
              value: 7,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        }}
        height="580px"
      />
      <div
        className="typing"
        id="typebro"
        style={{
          color: "#FF3C83",
        }}
      >
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("404 Error Mate but play Tic Tac Toe if you like")
              .pauseFor(2)
              .deleteAll()

              .callFunction(() => {
                setToggle(true);
                document.getElementById("typebro").remove();
              })

              .start();
          }}
        />
      </div>
      {toggle ? (
        <div id="ticgame">
          <Tic />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PageNotFound;
