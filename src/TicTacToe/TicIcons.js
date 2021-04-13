import React from "react";
import { FaTimes, FaAutoprefixer, FaRegCircle } from "react-icons/fa";
import "./TicIcons.css";
const TicIcons = ({ name }) => {
  switch (name) {
    case "circle":
      return <FaRegCircle className="icons" />;
    case "cross":
      return <FaTimes className="icons" />;
    default:
      return <FaAutoprefixer className="icons" />;
  }
};

export default TicIcons;
