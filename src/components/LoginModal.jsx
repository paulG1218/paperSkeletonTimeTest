import React, {useState} from 'react'
import { MdOutlineClose } from "react-icons/md";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const LoginModal = ({show, handleClose}) => {
    const dispatch = useDispatch()

    const [passwordState, setPasswordState] = useState("");
    const [confirmPasswordState, setConfirmPasswordState] = useState("");
    const [emailState, setEmailState] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (isRegistering) {
          if (passwordState === confirmPasswordState) {
            const res = await axios.post("/api/register", {
              password: passwordState,
              email: emailState,
            });
            switch (res.data.message) {
              case "success": {
                dispatch({
                  type: "authenticated",
                  payload: res.data.user,
                });
                setPasswordState("");
                setConfirmPasswordState("");
                setEmailState("");
                handleClose();
                break;
              }
            }
          } else {
            console.log("passswords dont match");
          }
        } else {
          const res = await axios.post("/api/login", {
            password: passwordState,
            email: emailState,
          });
          switch (res.data.message) {
            case "success": {
              dispatch({
                type: "authenticated",
                payload: res.data.user,
              });
              setPasswordState("");
              setConfirmPasswordState("");
              setEmailState("");
              handleClose();
              break;
            }
          }
        }
      };

  return (
    <Modal show={show} className="login-modal">
          <Modal.Header>
            <Button className="close-btn" onClick={handleClose}>
              <MdOutlineClose />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <h3 className="modal-title">
              {isRegistering ? "register" : "login"}
            </h3>
            <p className="modal-subtitle">
              become a member — enjoy first dibs on new products and rewards
            </p>
            <Form className="login-form" onSubmit={(e) => handleLogin(e)}>
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={(e) => setEmailState(e.target.value)}
              />
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPasswordState(e.target.value)}
              />
              {isRegistering && (
                <>
                  <Form.Label>confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setConfirmPasswordState(e.target.value)}
                  />
                </>
              )}
  
              {!isRegistering && (
                <div className="login-options">
                  <Form.Check
                    className="remember-check"
                    type="check"
                    label="remember me"
                  />
                  <a href="#forgot" className="forgot-password">
                    forgot password?
                  </a>
                </div>
              )}
              <Button className="login-btn" type="submit">
                {isRegistering ? "register account" : "login"}
              </Button>
              {isRegistering ? (
                <Button
                  className="register-btn"
                  onClick={() => setIsRegistering(false)}
                >
                  login
                </Button>
              ) : (
                <Button
                  className="register-btn"
                  onClick={() => setIsRegistering(true)}
                >
                  register
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>
  )
}

export default LoginModal
