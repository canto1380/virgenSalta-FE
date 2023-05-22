import React from "react";
import { Form, Input, Button, Spin } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { api } from "../../../utils/api";

const FormAddEdit = ({ userToken, loading, setLoading, dataRegisterEdit }) => {

  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };
  const handleSubmit = async (values) => {
    if(!dataRegisterEdit) {
      const res = await api("POST", "newsCategory", values, userToken);

      if (res.status === 200) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/admin/home";
        }, 2500);
      }
    } else {
      const res = await api("PATCH", `newsCategory/${dataRegisterEdit._id}`, values, userToken);

      if (res.status === 200) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/admin/home";
        }, 2500);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const expr =
    /^(ht|f)tps?:\/\/\w+([.\-\w]+)?\.[a-z]{2,10}(:\d{2,5})?(\/.*)?$/i;

  return (
    <div className="menuContainer">
      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 22 }}
        // initialValues={{ remember: true }}
        initialValues={{nameCategory: dataRegisterEdit?.nameCategory, backdrop: dataRegisterEdit?.backdrop}}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout='vertical'
        style={{marginLeft: '2vh'}}
      >
        <Form.Item
          label="Nombre Categoría"
          name="nameCategory"
          rules={[{ required: true, message: "Debe ingresar un nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Backdrop"
          name="backdrop"
          rules={[
            {
              required: true,
              message: "Debe ingresar una url válida",
              pattern: expr,
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item label="Upload" name='backdrop' valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item> */}

        {/* <div>
          {selectedImage && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button onClick={() => setSelectedImage(null)}>Remove</button>
            </div>
          )}

          <br />
          <br />

          <input
            type="file"
            name="myImage"
            src="https://drive.google.com/drive/u/1/folders/1H4bCePOsLD4X1ns9GNh35g_Pi_YOCchZ"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </div> */}
        <Form.Item
          className="text-end"
          labelCol={{ span: 1 }}
          wrapperCol={{ span: 22 }}
        >

          {loading ? (
            <Button disabled type="primary" htmlType="submit">
              <Spin
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="ms-2">{dataRegisterEdit ? 'Actualizando' : 'Agregando'}</span>
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              {dataRegisterEdit ? 'Actualizar' : 'Agregar'}
            </Button>
          )}
        </Form.Item>
        <div className="text-center">
          <span className="text-danger">* </span>Para cargar una imagen, ingrese{" "}
          <a href="https://drive.google.com/drive/u/1/folders/1H4bCePOsLD4X1ns9GNh35g_Pi_YOCchZ">
            Aqui
          </a>
          , haga click derecho en la imagen a cargar y presione 'Copiar enlace'
          y luego peguelo en el campo.
        </div>
      </Form>
    </div>
  );
};

export default FormAddEdit;
