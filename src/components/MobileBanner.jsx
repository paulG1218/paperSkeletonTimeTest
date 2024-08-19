import React from 'react'
import { Container, Button } from 'react-bootstrap'
import "../css/MobileBanner.css"

const MobileBanner = () => {
  return (
    <Container className='mobile-banner-container'>
        <img src="/banner-1.png" alt="" className='mobile-banner-img'/>
        <div className='mobile-banner-overlay'>
        <h5 className="mobile-banner-1">SUMMER 2024</h5>
          <h1 className="mobile-banner-1">NEW COLLECTION</h1>
          <h4 className="mobile-banner-1">shorts, tees, tanks & more!</h4>
          <Button className="mobile-banner-1">
            <h3 className="mobile-banner-1">SHOP NOW</h3>
          </Button>
        </div>
    </Container>
  )
}

export default MobileBanner
