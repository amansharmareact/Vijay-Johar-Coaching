import React from "react";
import { FaBicycle, FaCar, FaHelicopter, FaPlane, FaRocket, FaBus } from "react-icons/fa";
import "./Card.css";
const Card = () => {
  return (
    <div>
      <h1>OL circle cards</h1>
      <ol>
        <li>
          <div className="icon">
            <FaBicycle />
          </div>
          <div className="title">Step 1</div>
          <div className="descr">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, porro.
          </div>
        </li>
        <li>
          <div className="icon">
            <FaCar />
          </div>
          <div className="title">Step 2</div>
          <div className="descr">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, porro.
          </div>
        </li>
        <li>
          <div className="icon">
            <FaHelicopter />
          </div>
          <div className="title">Step 3</div>
          <div className="descr">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, porro.
          </div>
        </li>
        <li>
          <div className="icon">
            <FaPlane />
          </div>
          <div className="title">Step 4</div>
          <div className="descr">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, porro.
          </div>
        </li>
        <li>
          <div className="icon">
            <FaRocket />
          </div>
          <div className="title">Step 5</div>
          <div className="descr">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, porro.
          </div>
        </li>
        <li>
          <div className="icon">
            <FaBus />
          </div>
          <div className="title">Step 6</div>
          <div className="descr">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, porro.
          </div>
        </li>
      </ol>
      <div className="credits">
        <a href="https://www.freepik.com/premium-vector/vector-infographic-design-template-with-icons-8-options-steps_10571883.htm">
          inspired by
        </a>
      </div>
    </div>
  );
};

export default Card;
