import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import HomeComponentCards from "../Components/HomeComponentCards";
import "./home.css";

const HomeComponent = () => {
  const navigateTo = useNavigate();
  useEffect(() => {
    let checkUserLoggedIn = localStorage.getItem("userCreds");
    if (!checkUserLoggedIn) {
      navigateTo("/login");
    }
  }, []);
  return (
    <div className="homepage-container">
      <div className='homepage-cards-container'>
        <HomeComponentCards heading="Highest Expenses" />
        <HomeComponentCards heading="Most participated groups" />
        <HomeComponentCards heading="Recent groups" />
        <HomeComponentCards heading="Recent History" />
      </div>
    </div>
  );
};

export default HomeComponent;
