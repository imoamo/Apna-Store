import React from 'react'
import HeroSection from '../HeroSection/HeroSection';
import Service from '../component/Service';
import Trusted from '../component/Trusted';
import FeatureProduct from '../component/FeatureProduct';

const Home = () => {
  const data = {
    name: 'Apna Store',
  }
  return (
    <>
      <HeroSection myData={data} />
      <FeatureProduct/>
      <Service />
      <Trusted />
    </>
  )
};


export default Home;
