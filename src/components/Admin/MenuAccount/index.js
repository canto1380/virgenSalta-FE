import React, { useState, useEffect } from "react";
import "./menuAccount.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { setDataToken } from "../../../helpers/helpers";
import moment from "moment/moment";
import { api } from "../../../utils/api";
import MsgError from "../../Messages/MsgError";

const MenuAccount = ({ tokenAuth, dataAuth }) => {
  const [data, setData] = useState("");
  const [editBand, setEditBand] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [dataUpdated, setDataUpdated] = useState({
    name: "",
    surname: "",
    phone: "",
    birthdate: "",
  });
  const [loading, setLoading] = useState(false);
  const [passUpdated, setPassUpdated] = useState({
    passwordOld: "",
    password: "",
  });

  const [serverError, setServerError] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [dataErrorPass, setDataErrorPass] = useState(false);
  const [msgErrorPass, setMsgErrorPass] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUpdated({ ...dataUpdated, [name]: value });
  };

  const handleChangePass = (e) => {
    const { name, value } = e.target;
    setPassUpdated({ ...passUpdated, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(e);
  };
  const updateUser = async (e) => {
    try {
      const res = await api(
        "PATCH",
        `users/${data._id}`,
        dataUpdated,
        tokenAuth
      );

      const newDataToken = {
        name: dataUpdated?.name,
        surname: dataUpdated?.surname,
        nickname: dataUpdated?.nickname,
        _id: dataAuth?._id,
      };

      if (dataUpdated.email) {
        const nickname = dataUpdated.email.split("@");
        switch (nickname[1]) {
          case "gmail.com":
            newDataToken.nickname = nickname[0];
            break;
          case "hotmail.com":
            newDataToken.nickname = nickname[0] + ".";
            break;
          default:
            newDataToken.nickname = nickname[0] + "-";
            break;
        }
      }

      if (res.status === 200) {
        setLoading(true);
        newDataToken.nickname = res?.data?.userUpdated?.nickname;
        setDataToken(newDataToken);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/admin/home/cuenta";
        }, 3000);
        setTimeout(() => {
          setEditBand(false);
        }, 3000);
      }
      if (res?.response?.status === 400) {
        e.target.reset();
        const arraysError = res?.response?.data?.errors;
        setMsgError(arraysError);
        setDataError(true);
        setTimeout(() => {
          setDataError(false);
        }, 3000);
      }
    } catch (error) {
      setServerError(true);
      setTimeout(() => {
        setServerError(false);
      }, 3000);
    }
  };

  const handleSubmitPass = async (e) => {
    e.preventDefault();
    await updatePass(e);
  };
  const updatePass = async (e) => {
    try {
      const res = await api(
        "PATCH",
        `users/updatePass/${data._id}`,
        passUpdated,
        tokenAuth
      );
      if (res.status === 200) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/admin/home/cuenta";
        }, 3000);
        e.target.reset();
        setTimeout(() => {
          setEditPass(false);
        }, 3000);
      }
      if (res?.response?.status === 400) {
        const arraysError = res?.response?.data?.error;
        setMsgErrorPass(arraysError);
        setDataErrorPass(true);
        setTimeout(() => {
          setDataErrorPass(false);
        }, 3000);
      }
    } catch (error) {
      setServerError(true);
      setTimeout(() => {
        setServerError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    setData(dataAuth);
    setDataUpdated({
      ...dataUpdated,
      name: dataAuth?.name,
      surname: dataAuth?.surname,
      phone: dataAuth?.phone,
      birthdate: dataAuth?.birthdate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAuth]);

  return (
    <Container fluid>
      <Row className={`d-flex justify-content-between align-items-center`}>
        <Col xs={12} md={8} className={`mt-3`}>
          <div className={`pt-4 pb-1 px-4`}>
            <h3>Informacion Personal</h3>
          </div>
        </Col>
        <Col xs={12} md={4} className={`btnAlign mt-3 text-end`}>
          <div className={`pt-4 pb-1 px-4`}>
            <Button
              className={`section-btn ${editBand ? `` : ``}`}
              onClick={() => setEditBand(!editBand)}
            >
              {" "}
              {editBand ? "Volver" : "Editar Datos"}
            </Button>
          </div>
        </Col>
      </Row>
      <div className={`dataContainer mt-2`}>
        <Form onSubmit={handleSubmit}>
          <Row className={`d-flex justify-content-center rowData`}>
            <Col xs={12} md={6} className={``}>
              <p className={`fw-bolder mb-0`}>Nombre</p>
              <Form.Group className="" controlId="formBasicEmail">
                <Form.Control
                  className={` ${
                    editBand
                      ? `imputForm border border-2`
                      : `imputForm enabledField border border-0`
                  }
        `}
                  type="text"
                  name="name"
                  onChange={handleChange}
                  defaultValue={data?.name}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className={``}>
              <p className={`fw-bolder mb-0`}>Apellido</p>
              <Form.Group className="" controlId="formBasicEmail1">
                <Form.Control
                  className={` ${
                    editBand
                      ? `imputForm border border-2`
                      : `imputForm enabledField border border-0`
                  }
        `}
                  type="text"
                  name="surname"
                  onChange={handleChange}
                  defaultValue={data?.surname}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row className={`justify-content-center rowData`}>
            <Col xs={12} md={6} className={``}>
              <p className={`fw-bolder mb-0`}>Nacimiento</p>
              <Form.Group className="mb-3">
                <Form.Control
                  className={` ${
                    editBand
                      ? `imputForm border border-2`
                      : `imputForm enabledField border border-0`
                  }
        `}
                  type="date"
                  name="birthdate"
                  onChange={handleChange}
                  defaultValue={moment(data?.birthdate).format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className={``}>
              <p className={`fw-bolder mb-0`}>Telefono</p>
              <Form.Group className="" controlId="formBasicEmail2">
                <Form.Control
                  className={` ${
                    editBand
                      ? `imputForm border border-2`
                      : `imputForm enabledField border border-0`
                  }
        `}
                  type="number"
                  name="phone"
                  onChange={handleChange}
                  defaultValue={data?.phone}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row className={`justify-content-center  rowData`}>
            <Col xs={12} className={``}>
              <p className={`fw-bolder mb-0`}>Email</p>
              <Form.Group className="" controlId="formBasicEmail3">
                <Form.Control
                  className={` ${
                    editBand
                      ? `imputForm border border-2`
                      : `imputForm enabledField border border-0`
                  }
        `}
                  type="email"
                  name="email"
                  minLength="13"
                  maxLength="60"
                  onChange={handleChange}
                  defaultValue={data?.email}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={12} className={`text-end`}>
              {loading ? (
                <Button
                  variant="success"
                  type="submit"
                  className={` ${editBand ? `` : `enabledFieldd`}`}
                >
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Updating</span>
                </Button>
              ) : (
                <Button
                  variant="success"
                  type="submit"
                  className={`${editBand ? `` : `enabledFieldd`}`}
                >
                  Actualizar
                </Button>
              )}
            </Col>
          </Row>

          {dataError
            ? msgError.map((e, i) => <MsgError key={i} text2={e.msg} />)
            : null}

          {serverError ? <MsgError text2="Server internal Error" /> : null}
        </Form>
      </div>

      <Row className={`d-flex justify-content-between align-items-center`}>
        <Col xs={12} md={8} className={`mt-3`}>
          <div className={`pb-1 px-4`}>
            <h3>Clave personal</h3>
          </div>
        </Col>
        <Col xs={12} md={4} className={`btnAlign text-aling-midle text-end`}>
          <div className={`pb-1 px-4`}>
            <Button
              className={`section-btn`}
              onClick={() => setEditPass(!editPass)}
            >
              {" "}
              {editPass ? "Cancelar" : "Editar Clave"}
            </Button>
          </div>
        </Col>
      </Row>
      <div className={`dataContainer mt-2 mb-3`}>
        <Row className={`d-flex justify-content-center rowData`}>
          <Col xs={12} className={`text-start`}>
            <p className={`fw-bolder mb-0`}>Clave</p>
            <p type="password" className={`mb-1 fw-bold`}>
              ········
            </p>
          </Col>
        </Row>
        <Form onSubmit={handleSubmitPass}>
          <Row
            className={`${
              editPass
                ? `rowData pt-3 mb-3`
                : `enabledFieldPass rowData pt-3 mb-3`
            }`}
          >
            <Col xs={12} sm={6} lg={4}>
              <p className={`fw-bolder mb-0`}>Clave actual</p>
              <Form.Group className="" controlId="formBasicPassword">
                <Form.Control
                  size="sm"
                  type="password"
                  name="passwordOld"
                  minLength="8"
                  maxLength="16"
                  autoComplete="on"
                  onChange={handleChangePass}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} lg={4}>
              <p className={`fw-bolder mb-0`}>Nueva Clave</p>
              <Form.Group className="" controlId="formBasicPassword1">
                <Form.Control
                  size="sm"
                  type="password"
                  name="password"
                  minLength="8"
                  maxLength="16"
                  onChange={handleChangePass}
                  autoComplete="on"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className={`text-end`}>
              {loading ? (
                <Button
                  variant="success"
                  type="submit"
                  className={` ${editPass ? `` : `enabledFieldd`}`}
                >
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Actualizando</span>
                </Button>
              ) : (
                <Button
                  variant="success"
                  type="submit"
                  className={` ${editPass ? `` : `enabledFieldd`}`}
                >
                  Actualizar Clave
                </Button>
              )}
            </Col>
          </Row>
          {dataErrorPass ? (
            <div className="alertError">
              <Alert className={`text-center mt-3 w-50`} variant="danger">
                {msgErrorPass}. Intente nuevamente
              </Alert>
            </div>
          ) : null}
        </Form>
      </div>
    </Container>
  );
};

export default MenuAccount;
