import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const history = useNavigate();

  const handleGetStartedClick = () => {
    history("/signin");
  };

  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center custom-sky-blue mb-4">
          Elevate Your Productivity <br /> to New Heights.
        </h1>
       
        <button className="home-btn p-2" onClick={handleGetStartedClick}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
