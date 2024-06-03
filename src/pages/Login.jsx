import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const Login = () => {
  return (
    <Form>
      <h1 className="mb-4">Login</h1>
      <Form.Group as={Row} className="mb-5">
        <Form.Label column xs={{ offset: 2, span: 2 }} className="fs-4">
          Email address
        </Form.Label>
        <Col xs={6}>
          <Form.Control type="email" placeholder="Email" size="lg" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-5">
        <Form.Label column xs={{ offset: 2, span: 2 }} className="fs-4">
          Password
        </Form.Label>
        <Col xs={6}>
          <Form.Control type="password" placeholder="Password" size="lg" />
        </Col>
      </Form.Group>
      <Row>
        <Button
          variant="secondary"
          size="lg"
          as={Col}
          xs={{ offset: 2, span: 8 }}
        >
          Sign In
        </Button>
      </Row>
    </Form>
  );
};

export default Login;
