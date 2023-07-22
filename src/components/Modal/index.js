import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { api } from "../../utils/api";
import MsgError from "../Messages/MsgError";

const ModalGeneric = ({
  setVisible,
  visible,
  dataRegisterEdit,
  resetDataEdit,
  userToken,
  band,
  setBand,
}) => {
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [serverError, setServerError] = useState(false);

  const handleOk = async (values) => {
    try {
      if (!dataRegisterEdit) {
        const res = await api("POST", "eventType", values, userToken);
        if (res.status === 200) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setBand(!band);
            setVisible(false);
          }, 2500);
        }
        if (res?.response?.status === 400) {
          const arraysError = res?.response?.data?.errors;
          setMessageError(arraysError);
          setDataError(true);
          setTimeout(() => {
            setDataError(false);
          }, 3000);
        }
      } else {
        const res = await api(
          "PATCH",
          `eventType/${dataRegisterEdit._id}`,
          values,
          userToken
        );
        if (res.status === 200) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setVisible(false);
            setBand(!band);
          }, 2500);
        }
        if (res?.response?.status === 400) {
          const arraysError = res?.response?.data?.errors;
          setMessageError(arraysError);
          setDataError(true);
          setTimeout(() => {
            setDataError(false);
          }, 3000);
        }
      }
    } catch (error) {
      setServerError(error);
    }
  };
  const handleCancel = () => {
    resetDataEdit(null);
  };
  return (
    <div>
      <Modal
        maskClosable={false}
        open={visible}
        title={
          dataRegisterEdit
            ? "Actualizar categoría de evento"
            : "Nueva categoría de evento"
        }
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        footer={[null, null]}
      >
        <Form
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 22 }}
          initialValues={{ eventName: dataRegisterEdit?.eventName }}
          onFinish={handleOk}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Nombre de evento"
            name="eventName"
            style={{
              marginTop: '30px',
            }}
            rules={[{ required: true, message: "Debe ingresar un nombre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 1 }}
            wrapperCol={{ span: 22 }}
            className="text-end"
          >
            <Button type="primary" className="me-2" onClick={handleCancel}>
              Volver
            </Button>
            <Button htmlType="submit" type="primary" loading={loading}>
              {loading
                ? dataRegisterEdit
                  ? "Actualizando"
                  : "Agregando"
                : dataRegisterEdit
                ? "Actualizar"
                : "Agregar"}
            </Button>
          </Form.Item>
          {dataError
            ? messageError.map((e, i) => <MsgError key={i} text2={e.msg} />)
            : null}
          {serverError ? <MsgError text2="Server internal Error" /> : null}
        </Form>
      </Modal>
    </div>
  );
};

export default ModalGeneric;
