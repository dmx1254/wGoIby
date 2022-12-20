import React from "react";
import logoSpin from "../assets/loaderGif.gif";
import goibendoumalogo from "../assets/goibendouma-logo.png";
const LoaderServer = () => {
  return (
    <div className="loaderserver">
      <div className="loader-go-gif">
        <img src={logoSpin} alt="goibendouma spinner" />
      </div>
    </div>
  );
};

export default LoaderServer;
