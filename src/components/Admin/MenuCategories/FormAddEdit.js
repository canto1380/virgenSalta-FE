import React, { useEffect, useState } from "react";
import { Form, Input, Button, Spin } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { api } from "../../../utils/api";

const FormAddEdit = ({ userToken, loading, setLoading, dataRegisterEdit }) => {
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [linkImage, setLinkImage] = useState("");

  const handleSubmit = async (values) => {
    if (!dataRegisterEdit) {
      values.backdrop = selectedImage;
      const res = await api("POST", "newsCategory", values, userToken);

      if (res.status === 200) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/admin/home/categorias";
        }, 2500);
      }
    } else {
      const res = await api(
        "PATCH",
        `newsCategory/${dataRegisterEdit._id}`,
        values,
        userToken
      );

      if (res.status === 200) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/admin/home/categorias";
        }, 2500);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const expr = /^(ht|f)tps?:\/\/drive\.google\.com\/file/i;

  useEffect(() => {
    if (selectedImage) {
      const a = selectedImage.split("/");
      const len = a.length;
      setLinkImage(a[len - 2]);
    }
  }, [dataRegisterEdit, selectedImage]);

  useEffect(() => {
    setSelectedImage(dataRegisterEdit?.backdrop);
  }, [dataRegisterEdit]);

  const changeInputBackdrop = (e) => {
    setSelectedImage(e?.target?.value);
  };

  return (
    <div className="menuContainer">
      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 22 }}
        initialValues={{
          nameCategory: dataRegisterEdit?.nameCategory,
          backdrop: dataRegisterEdit?.backdrop,
        }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        style={{ marginLeft: "2vh" }}
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
          onChange={(e) => changeInputBackdrop(e)}
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
        <div>
          {selectedImage && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={`https://drive.google.com/uc?id=${linkImage}`}
                // src={URL.createObjectURL(selectedImage)}
              />
              <br />
              {/* <button onClick={(e) => removeImg(e)}>Remove</button> */}
            </div>
          )}

          <br />
          <br />

          {/* <input
            disabled="disabled"
            type="file"
            name="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          /> */}
        </div>
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
              <span className="ms-2">
                {dataRegisterEdit ? "Actualizando" : "Agregando"}
              </span>
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              {dataRegisterEdit ? "Actualizar" : "Agregar"}
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
