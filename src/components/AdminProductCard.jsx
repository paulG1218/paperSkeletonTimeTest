import React from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import "../css/AdminProductCard.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminProductCard = ({product}) => {
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/addProduct?productId=${product.productId}`)
    }

    const handleDelete = async () => {
        const res = await axios.delete(`/api/products/${product.productId}`)
        console.log(res.data)
    }

  return (
    <Card className='admin-card'>
        <Card.Img src={product.image} className='admin-card-image'/>
        <Card.Body className='admin-card-body'>
            <Container className='admin-card-container'>
                <Row className='admin-card-row'>
                    <Col className='admin-card-col-1'>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Subtitle className="admin-card-price">
                            ${product.price}
                        </Card.Subtitle>
                    </Col>
                    <Col className='admin-card-col-2'>
                    <Button className='admin-card-edit-btn' onClick={handleEdit}>
                        <img src="/edit.svg" alt="" className='admin-edit-svg'/>
                    </Button>
                    <Button className='admin-card-delete-btn' onClick={handleDelete}>
                        <img src="/delete.svg" alt="" className='admin-remove-svg'/>
                    </Button>
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    </Card>
  )
}

export default AdminProductCard
