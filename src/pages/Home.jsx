import React from "react";
import TopStrip from "../componant/TopStrip";
import HomeHero from "../componant/HomeHero";
import PopularProducts from "../componant/PopularProducts";
import Section from "../componant/Section";
import Header from "../componant/Header";
import Feauturecategory from "../componant/FeaturedCategories";
// import ProductsPage from "./ProductsPage";


export default function Home() {
  

  return (
        <>
        {/* <TopStrip/> */}
         <Header/>
         <HomeHero/>
         <Feauturecategory/>
        <Section/>
        <PopularProducts/>
      



</>
)}
export {Home}