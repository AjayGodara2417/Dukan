import React from "react";
import Hero from "../components/Hero";
import Heading from "../components/Heading";
import DemoProducts from "../components/DemoProducts";

const Home: React.FC = () => {
  return (
    <>
    <Hero />
    <Heading text='Latest Products'/>
    <DemoProducts />
    </>
  );
};

export default Home;
