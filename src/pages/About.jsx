import HeroSection from '../HeroSection/HeroSection'
import Service from '../component/Service'
import Trusted from '../component/Trusted'
import { useProductContext } from '../context/ProductContext'

const About = () => {
  const {myApp} = useProductContext();
  const data = {
    name: 'Apna Ecommerce',
  }
  return (
    <>
      {myApp}
      <HeroSection myData={data} />
      <Service />
      <Trusted />
    </>
  )
}

export default About