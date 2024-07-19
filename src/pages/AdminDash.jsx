import React, { useEffect } from 'react'
import { Container, Nav, Row } from 'react-bootstrap'
import { useLoaderData, useNavigate } from 'react-router-dom'
import AdminProductCard from '../components/AdminProductCard'

const AdminDash = () => {

    const {isAdmin, products} = useLoaderData()

    const navigate = useNavigate()

    const adminCards = products.map((product, i) => {
        return (
            <AdminProductCard
                key={i}
                product={product}
            />
        )
    })

    useEffect(() => {
        if (!isAdmin) {
            navigate("/")
        }
    }, [])
  return (
    <Container>
      <Row>
        <Nav.Link href='/addProduct'>
             <h4>+ Add product</h4>
        </Nav.Link>
      </Row>
      <Row>
        {adminCards}
      </Row>
    </Container>
  )
}

export default AdminDash
