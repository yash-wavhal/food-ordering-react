import React from 'react';
import Navbar from '../components/header/Navbar';
import Main from '../components/Main';
import Footer from '../components/footer/Footer';
import DeliveryCollections from '../components/Delivery/DeliveryCollection/DeliveryCollections';

const Home = () => {
  return (
    <>
      <Navbar/>
      <Main 
        MainImg="https://static.vecteezy.com/system/resources/previews/007/550/780/original/food-delivery-app-on-a-smartphone-tracking-a-delivery-man-on-a-moped-with-a-ready-meal-technology-and-logistics-concept-city-skyline-in-the-background-vector.jpg"
        title="Your Taste Our Service"
        text="DishDelight is a online delivery web app where you can find your tasty food easily!"
        buttonText="Get Started"
        url="/item"
        btnclass="show"
      />
      <DeliveryCollections />
      <Footer />
    </>
  )
};

export default Home;
