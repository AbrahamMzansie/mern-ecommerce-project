import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShowMessage from "../../components/UI/AlertMessage";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { login } from "../../actions/authActions";
import ShowSpinner from "../../components/UI/Spinner";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Layout>
        <Container>
          {auth.loading ? (
            null
          ) : (
            auth &&
            auth.error && <ShowMessage message={auth.error} variant="danger" />
          )}
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={(e) => userLogin(e)}>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type={"text"}
                  label="Email Address"
                  placeholder="Email Address"
                />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  label="Password"
                  placeholder="Password"
                />

                <Button
                  onClick={(e) => userLogin(e)}
                  variant="primary"
                  type="submit"
                >
                  {auth.loading ? (
            <ShowSpinner
              style={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
              }}
            />
          ): "Submit"}
                  
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
};
/*
const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(login(user)),
  };
};
*/
export default Signin;
