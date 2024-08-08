import React from 'react'
import Hero from '../Components/Hero'
import Card from '../Components/Card'
import sampleImage from "../image/pdf.jpeg";
import addIcon from "../image/Create.png";
import './Home.css'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Hero />  
      <div className="cardContainer">
        <Card image={sampleImage} title={'Sample Bill'}/>
        <Link to={'/newBill'}>
          <Card image={addIcon} title={'Create New Bill'}/>
        </Link>
      </div>
      
    </>
  )
}

export default Home