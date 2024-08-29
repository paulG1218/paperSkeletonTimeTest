import React from 'react'
import { Row, Col, Button} from "react-bootstrap"

const DesktopBanner = () => {
  return (
    <Row className="banner-1">
        <Col className="banner-1 title">
          <h5 className="banner-1">SUMMER 2024</h5>
          <h1 className="banner-1">NEW COLLECTION</h1>
          <h4 className="banner-1">shorts, tees, tanks & more!</h4>
          <Button className="banner-1">
            <h3 className="banner-1">SHOP NOW</h3>
          </Button>
        </Col>
        <Col className="banner-1-img-col">
          <img
            src="/banner-1.png"
            alt=""
            className="banner-1 image"
            width="415px"
          />
        </Col>
      </Row>
  )
}

export default DesktopBanner
