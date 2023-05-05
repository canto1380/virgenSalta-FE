import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "./index.css";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { validaEmail, validaClave } from "../../utils/validations/validation";
import Cookies from "js-cookie";
import { setToken, setDataToken } from "../../helpers/helpers";
import MsgError from "../../components/Messages/MsgError";
import loginAPI from "../../utils/authentication/login";

export const COOKIES = {
  authToken: "token",
  authId: "idUser",
};

const Login = ({ bandera, setBandera, token }) => {
  const [loading, setLoading] = useState(false);

  const [dataError, setDataError] = useState(false);
  const [msgDataError, setMsgDataError] = useState("");
  const [errorServer, setErrorServer] = useState(false);
  const [errorValid, setErrorValid] = useState(false);

  const handleSubmit = (values) => {
    try {
      if (validaEmail(values.email) && validaClave(values.password)) {
        login(values);
      } else {
        setErrorValid(true);
        setTimeout(() => {
          setErrorValid(false);
        }, 3000);
      }
    } catch (error) {
      setErrorServer(true);
      setTimeout(() => {
        setErrorServer(false);
      }, 3000);
    }
  };

  const login = async (values) => {
    try {
      const res = await loginAPI(values);
      if (res.status === 200) {
        const {
          token,
          user: { _id, nickname, name, surname },
        } = res.data;
        Cookies.set(COOKIES.authToken, token, process.env.REACT_APP_API, {
          expires: 1,
        });
        Cookies.set(
          COOKIES.authId,
          (_id, nickname, name, surname),
          process.env.REACT_APP_API,
          { expires: 1 }
        );
        setToken(res?.data?.token);
        setDataToken(res?.data?.user);

        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setBandera(!bandera);
        }, 3000);
        setTimeout(() => {
          // window.location.href ='/admin/home'
        }, 3000);
      }
      if (res?.response?.status === 404) {
        console.log(res);
        setDataError(true);
        setMsgDataError(res?.response?.data?.error);
        setTimeout(() => {
          setDataError(false);
        }, 3000);
      }
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container-login">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs={10} sm={8} md={6} className="container-form">
            <h2 className="text-center pb-5 title-login">Inciar sesión</h2>
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 17 }}
              initialValues={{ remember: true }}
              // onSubmit={handleSubmit}
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Usuario"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar un email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Clave"
                name="password"
                rules={[{ required: true, message: "Debe ingresar su clave!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 10, span: 16 }} className="pt-4">
                {loading ? (
                  <Button disabled type="primary" htmlType="submit">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">Ingresando</span>
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit">
                    Ingresar
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col xs={10} sm={8} md={6} className="">
            {errorValid && (
              <MsgError
                text1="Datos incorrectos."
                text2="Ingrese un mail y clave valida."
              />
            )}
            {dataError && (
              <MsgError text1="Datos incorrectos." text2={msgDataError} />
            )}
            {errorServer && (
              <MsgError
                text1="Hubo un problema en el servidor."
                text2="Intente mas tarde"
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
