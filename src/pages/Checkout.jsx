import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import "../css/Checkout.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import stateAbrv from "../stateAbrv.json";

const Checkout = () => {
  const cart = useLoaderData();

  const navigate = useNavigate();

  useEffect(() => {
    if (!cart.length) {
      navigate("/");
    }
  }, []);

  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.price * item.quantity;
    });
    setSubTotal(count.toFixed(2));
    setShipping((9.99 + count * 0.07).toFixed(2));
  }, [cart]);

  const [checkoutInfo, setCheckoutInfo] = useState({
    active: "personal",
    step: 0,
    firstName: "",
    lastName: "",
    phone: "",
    birthday: "",
    billingAddress: "",
    billingAddress2: "",
    billingCity: "",
    billingZip: "",
    billingState: "",
    sameAsBilling: false,
    shippingAddress: "",
    shippingAddress2: "",
    shippingCity: "",
    shippingZip: "",
    shippingState: "",
    cardName: "",
    card: "",
    exp: "",
    cvc: "",
  });

  const sections = ["personal", "billing", "shipping", "payment", ""];

  const stateOptions = stateAbrv.map((state, i) => {
    return <option key={i} value={state}>{state}</option>;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkoutInfo.step === sections.indexOf(checkoutInfo.active)) {
      setCheckoutInfo({
        ...checkoutInfo,
        active: sections[checkoutInfo.step + 1],
        step: checkoutInfo.step + 1,
      });
    } else {
      setCheckoutInfo({
        ...checkoutInfo,
        active: sections[checkoutInfo.step],
      });
    }
  };


  const orderDetails = () => {
    let returnArray = []
    let orderCount = 0
    if (cart.length > 4) {
        for (let i = 0; i < 3; i++) {
            const item = cart[i]
            returnArray.push(<img src={item.image} alt={`image of ${item.title}`} className="order-detail-img"/>)
        }
        returnArray.push(<div className="extra-items-card"><h1>+{cart.length-3}</h1></div>)
    } else {
        cart.forEach((item) => {
            returnArray.push(<img src={item.image} alt={`image of ${item.title}`} className="order-detail-img"/>)
        })
    }
  return returnArray
}

  return (
    <Container>
      <Row>
        <h1 className="checkout-header">Checkout</h1>
        <Col>
          <Card className="personal-info checkout-card">
            <Card.Title className="checkout-card-title">
              personal info
              {checkoutInfo.active !== "personal" && (
                <img
                  src="/edit.svg"
                  alt="edit"
                  className="checkout-card-edit"
                  onClick={() => {
                    setCheckoutInfo({ ...checkoutInfo, active: "personal" });
                  }}
                />
              )}
            </Card.Title>
            {checkoutInfo.active !== "personal" ? (
              <>
                <p>{checkoutInfo.firstName + " " + checkoutInfo.lastName}</p>
                <p>
                  {checkoutInfo.phone.slice(0, 3) +
                    " " +
                    checkoutInfo.phone.slice(3, 6) +
                    " " +
                    checkoutInfo.phone.slice(6)}
                </p>
                <p>
                  {checkoutInfo.birthday.slice(5, 7) +
                    "/" +
                    checkoutInfo.birthday.slice(8) +
                    "/" +
                    checkoutInfo.birthday.slice(0, 4)}
                </p>
              </>
            ) : (
              <Card.Body className="checkout-card-body">
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Row className="personal-info-row-1">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        first name
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.firstName}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Label className="checkout-form-label">
                        last name
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.lastName}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="personal-info-row-2">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        phone number
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        type="tel"
                        pattern="[0-9]{10}"
                        value={checkoutInfo.phone}
                        onChange={(e) => {
                          setCheckoutInfo({
                            ...checkoutInfo,
                            phone: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="checkout-form-label">
                        date of birth - mm/dd/yyyy
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        type="date"
                        value={checkoutInfo.birthday}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            birthday: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="checkout-btn-row">
                    <button
                      className="checkout-card-btn checkout-save"
                      type="submit"
                    >
                      save
                    </button>
                    <button className="checkout-card-btn checkout-cancel">
                      cancel
                    </button>
                  </Row>
                </Form>
              </Card.Body>
            )}
          </Card>
          <Card className="billing checkout-card">
            <Card.Title
              className="checkout-card-title"
              style={{ opacity: checkoutInfo.step < 1 ? "50%" : "100%" }}
            >
              billing
              {checkoutInfo.active !== "billing" && checkoutInfo.step > 0 && (
                <img
                  src="/edit.svg"
                  alt="edit"
                  className="checkout-card-edit"
                  onClick={() => {
                    setCheckoutInfo({ ...checkoutInfo, active: "billing" });
                  }}
                />
              )}
            </Card.Title>
            {checkoutInfo.active !== "billing" ? (
              !checkoutInfo.step < 1 && (
                <>
                  <p>{checkoutInfo.billingAddress}</p>
                  {checkoutInfo.billingAddress2 && (
                    <p>{checkoutInfo.billingAddress2}</p>
                  )}
                  <p>
                    {checkoutInfo.billingCity +
                      ", " +
                      checkoutInfo.billingState +
                      "  " +
                      checkoutInfo.billingZip}
                  </p>
                </>
              )
            ) : (
              <Card.Body className="checkout-card-body">
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Row className="billing-info-row-1">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        address
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.billingAddress}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            billingAddress: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="billing-info-row-2">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        address line 2
                      </Form.Label>
                      <Form.Control
                        className="checkout-form-control"
                        value={checkoutInfo.billingAddress2}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            billingAddress2: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="billing-info-row-3">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        town/city
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.billingCity}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            billingCity: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Label className="checkout-form-label">
                        zip code
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.billingZip}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            billingZip: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="billing-info-row-4">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        state
                      </Form.Label>
                      <select
                        name="select-state"
                        required
                        className="state-select"
                        value={checkoutInfo.billingState}
                        onChange={(e) => {
                          setCheckoutInfo({
                            ...checkoutInfo,
                            billingState: e.target.value,
                          });
                        }}
                      >
                        <option value="">select state</option>
                        {stateOptions}
                      </select>
                    </Col>
                  </Row>
                  <Row className="checkout-btn-row">
                    <button
                      className="checkout-card-btn checkout-save"
                      type="submit"
                    >
                      save
                    </button>
                    <button className="checkout-card-btn checkout-cancel">
                      cancel
                    </button>
                  </Row>
                </Form>
              </Card.Body>
            )}
          </Card>
          <Card className="shipping checkout-card">
            <Card.Title
              className="checkout-card-title"
              style={{ opacity: checkoutInfo.step < 2 ? "50%" : "100%" }}
            >
              shipping
              {checkoutInfo.active !== "shipping" && checkoutInfo.step > 1 && (
                <img
                  src="/edit.svg"
                  alt="edit"
                  className="checkout-card-edit"
                  onClick={() => {
                    setCheckoutInfo({ ...checkoutInfo, active: "billing" });
                  }}
                />
              )}
            </Card.Title>
            {checkoutInfo.active !== "shipping" ? (
              checkoutInfo.step > 2 &&
              (checkoutInfo.sameAsBilling ? (
                <Form.Check
                  type="checkbox"
                  label="same as billing address"
                  checked
                  readOnly
                />
              ) : (
                <>
                  <p>{checkoutInfo.shippingAddress}</p>
                  {checkoutInfo.shippingAddress2 && (
                    <p>{checkoutInfo.shippingAddress2}</p>
                  )}
                  <p>
                    {checkoutInfo.shippingCity +
                      ", " +
                      checkoutInfo.shippingState +
                      "  " +
                      checkoutInfo.shippingZip}
                  </p>
                </>
              ))
            ) : (
              <Card.Body className="checkout-card-body">
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Row className="shipping-info-row-0">
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="same as billing address"
                        checked={checkoutInfo.sameAsBilling}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            sameAsBilling: e.target.checked,
                            shippingAddress: e.target.checked
                              ? checkoutInfo.billingAddress
                              : "",
                            shippingAddress2: e.target.checked
                              ? checkoutInfo.billingAddress2
                              : "",
                            shippingCity: e.target.checked
                              ? checkoutInfo.billingCity
                              : "",
                            shippingState: e.target.checked
                              ? checkoutInfo.billingState
                              : "",
                            shippingZip: e.target.checked
                              ? checkoutInfo.billingZip
                              : "",
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="shipping-info-row-1">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        address
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.shippingAddress}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            shippingAddress: e.target.value,
                          })
                        }
                        disabled={checkoutInfo.sameAsBilling}
                      />
                    </Col>
                  </Row>
                  <Row className="shipping-info-row-2">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        address line 2
                      </Form.Label>
                      <Form.Control
                        className="checkout-form-control"
                        value={checkoutInfo.shippingAddress2}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            shippingAddress2: e.target.value,
                          })
                        }
                        disabled={checkoutInfo.sameAsBilling}
                      />
                    </Col>
                  </Row>
                  <Row className="shipping-info-row-3">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        town/city
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.shippingCity}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            shippingCity: e.target.value,
                          })
                        }
                        disabled={checkoutInfo.sameAsBilling}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="checkout-form-label">
                        zip code
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.shippingZip}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            shippingZip: e.target.value,
                          })
                        }
                        disabled={checkoutInfo.sameAsBilling}
                      />
                    </Col>
                  </Row>
                  <Row className="shipping-info-row-4">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        state
                      </Form.Label>
                      <select
                        name="select-state"
                        required
                        className="state-select"
                        value={checkoutInfo.shippingState}
                        onChange={(e) => {
                          setCheckoutInfo({
                            ...checkoutInfo,
                            shippingState: e.target.value,
                          });
                        }}
                        disabled={checkoutInfo.sameAsBilling}
                      >
                        <option value="">select state</option>
                        {stateOptions}
                      </select>
                    </Col>
                  </Row>
                  <Row className="checkout-btn-row">
                    <button
                      className="checkout-card-btn checkout-save"
                      type="submit"
                    >
                      save
                    </button>
                    <button className="checkout-card-btn checkout-cancel">
                      cancel
                    </button>
                  </Row>
                </Form>
              </Card.Body>
            )}
          </Card>

          <Card className="order-details checkout-card">
            {orderDetails()}
            </Card>

          <Card className="payment checkout-card">
            <Card.Title
              className="checkout-card-title"
              style={{ opacity: checkoutInfo.step < 3 ? "50%" : "100%" }}
            >
              payment
              {checkoutInfo.active !== "payment" && checkoutInfo.step > 2 && (
                <img
                  src="/edit.svg"
                  alt="edit"
                  className="checkout-card-edit"
                  onClick={() => {
                    setCheckoutInfo({ ...checkoutInfo, active: "payment" });
                  }}
                />
              )}
            </Card.Title>
            {checkoutInfo.active !== "payment" ? (
              checkoutInfo.step > 3 && (
                <>
                  <p>{checkoutInfo.cardName}</p>
                  <p>
                    **** **** **** {checkoutInfo.card.slice(-4)}
                  </p>
                  <p>{checkoutInfo.exp}</p>
                </>
              )
            ) : (
              <Card.Body className="checkout-card-body">
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Row className="payment-info-row-1">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        name on card
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.cardName}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            cardName: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="payment-info-row-2">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        card number
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.card}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            card: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="payment-info-row-3">
                    <Col>
                      <Form.Label className="checkout-form-label">
                        exp date
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.exp}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            exp: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Label className="checkout-form-label">
                        cvc
                      </Form.Label>
                      <Form.Control
                        required
                        className="checkout-form-control"
                        value={checkoutInfo.cvc}
                        onChange={(e) =>
                          setCheckoutInfo({
                            ...checkoutInfo,
                            cvc: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="checkout-btn-row">
                    <button
                      className="checkout-card-btn checkout-save"
                      type="submit"
                    >
                      save
                    </button>
                    <button className="checkout-card-btn checkout-cancel">
                      cancel
                    </button>
                  </Row>
                </Form>
              </Card.Body>
            )}
          </Card>
        </Col>
        <Col>
            <Card className="checkout-total-card">
                <Row>
                    <Col>
                    <p className="checkout-total-text left">sub total</p>
                    <p className="checkout-total-text left">est. shipping & tax</p>
                    </Col>
                    <Col>
                    <p className="checkout-total-text right">${subTotal}</p>
                    <p className="checkout-total-text right">${shipping}</p>
                    </Col>
                </Row>
                <hr className="checkout-total-divider" />
                <Row>
                    <Col>
                    <p className="checkout-total-text left">total</p>
                    </Col>
                    <Col>
                    <p className="checkout-total-text right">
                        ${(Number(subTotal) + Number(shipping)).toFixed(2)}
                    </p>
                    </Col>
                </Row>
                <Button className="order-btn" disabled={checkoutInfo.step < 4}>{checkoutInfo.step < 4 ? "almost done" : "place order"}</Button>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
