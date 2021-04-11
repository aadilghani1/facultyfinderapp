import React from "react";
import Particles from "react-particles-js";
import Typewriter from "typewriter-effect";

function Landing() {
  return (
    <div style={{ background: "#fff" }}>
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
              .typeString("Cloud Project By Aadil, Sanjay and Abhav")
              .pauseFor(2)
              .deleteAll()
              .typeString(
                "Hello Everybody this is our Project Implementation for Review-2"
              )
              .deleteAll()
              .callFunction(() => {
                document.getElementById("typebro").remove();
              })
              .start();
          }}
        />
      </div>
    </div>
  );
}

export default Landing;
