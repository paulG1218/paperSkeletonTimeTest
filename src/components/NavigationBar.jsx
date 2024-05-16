import React from 'react'
import { Navbar, Nav, Container, Row, Col, Form, InputGroup, Button, NavDropdown } from 'react-bootstrap'
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import "../css/NavigationBar.css"

const NavigationBar = () => {
  return (
    <>
    <Navbar className='navigationBar top'>
      <Container fluid className='topNavigationContainer'>
            <Navbar.Brand href="/" className='logo'><h1>LOGO</h1></Navbar.Brand>
            <Col>
            <Nav>
            <Col xs={{span: 9, offset: 1}}>
                <InputGroup>
                  <Button variant='outline-secondary'><IoMdSearch /></Button>
                  <Form.Control type='search' placeholder='Search the store' className='border-secondary'/>
                </InputGroup>
            </Col >
            <Col xs={{span: 1}}>
              <Nav.Link href='#cart'><FaCartShopping /></Nav.Link>
            </Col>
            <Col xs={{span: 1}}>
              <Nav.Link href='/login' className='justify-self-end'>Login</Nav.Link>
            </Col>
            </Nav>
            </Col>
      </Container>
    </Navbar>
    <hr className='navigationDivider'/>
    <Navbar className='navigationBar bottom'>
      <Container>
        <Col>
        <Nav variant='underline'>
          <Col>
          <Nav.Link className='fs-4'>Just in</Nav.Link>
          </Col>
          <Col>
            <NavDropdown title='Men' className='fs-4'>
              <NavDropdown.Item>A thing</NavDropdown.Item>
            </NavDropdown>
          </Col>
          <Col>
            <NavDropdown title='Women' className='fs-4'>
              <NavDropdown.Item>A thing</NavDropdown.Item>
            </NavDropdown>
          </Col>
          <Col>
            <NavDropdown title='Accessories' className='fs-4'>
              <NavDropdown.Item>A thing</NavDropdown.Item>
            </NavDropdown>
          </Col>
          <Col>
            <NavDropdown title='Shoes' className='fs-4'>
              <NavDropdown.Item>A thing</NavDropdown.Item>
            </NavDropdown>
          </Col>
          <Col>
            <NavDropdown title='Sale' className='fs-4'>
              <NavDropdown.Item>A thing</NavDropdown.Item>
            </NavDropdown>
          </Col>
        </Nav>
        </Col>
      </Container>
    </Navbar>
    </>
  )
}

export default NavigationBar
