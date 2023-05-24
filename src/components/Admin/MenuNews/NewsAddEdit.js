import React from "react";
// import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Spin } from "antd";
import { api } from "../../../utils/api";
const { TextArea } = Input;
// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };
// const dummyRequest = ({ file, onSuccess }) => {
//   setTimeout(() => {
//     imgName.push(file.name);
//     onSuccess("ok");
//   }, 0);
// };

const NewsAddEdit = ({
  data,
  dataRegisterEdit,
  loading,
  setLoading,
  userToken,
}) => {
  // const [linkImage, setLinkImage] = useState([]);
  // const [selectedImage, setSelectedImage] = useState(undefined);
  // const [nameCategory, setNameCategory ] = useState()
  // let imgName = [];

  // const expr = /^(ht|f)tps?:\/\/drive\.google\.com\/file/i;

  const handleSubmit = async (values) => {
    if (!dataRegisterEdit) {
      // values.photos = imgName;
      const res = await api("POST", "news", values, userToken);

      if (res.status === 200) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/admin/home/noticias";
        }, 2500);
      }
    } else {
      const res = await api("PATCH", `news/${dataRegisterEdit._id}`, values, userToken);

      if (res.status === 200) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/admin/home/noticias";
        }, 2500);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  // useEffect(() => {
  //   if (selectedImage) {
  //     selectedImage.forEach((d, i) => {
  //       const a = d.split("/");
  //       const len = a.length;
  //       const b = a[len - 2];
  //       imgName.push(b);
  //     });
  //     setLinkImage(imgName);
  //   }
  // }, [dataRegisterEdit, selectedImage]);

  // useEffect(() => {
  //   setSelectedImage(dataRegisterEdit?.photos);
  // }, [dataRegisterEdit]);

  return (
    <div className="menuContainer">
      <Form
        labelCol={{
          span: 22,
        }}
        wrapperCol={{
          span: 22,
        }}
        layout="vertical"
        style={{
          marginLeft: "2vh",
        }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        initialValues={{
          title: dataRegisterEdit?.title,
          subtitle: dataRegisterEdit?.subtitle,
          description: dataRegisterEdit?.description,
          idNewsCategory: dataRegisterEdit?.idNewsCategory?._id,
          caption: dataRegisterEdit?.caption
        }}
      >
        <Form.Item
          label="Título Noticia"
          name="title"
          rules={[{ required: true, message: "Debe ingresar un nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Subtítulo"
          name="subtitle"
          rules={[{ required: true, message: "Debe ingresar un texto" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="description"
          rules={[{ required: true, message: "Debe ingresar un texto" }]}
        >
          <TextArea rows={8} />
        </Form.Item>

        <Form.Item
          label="Categoría"
          name="idNewsCategory"
          rules={[
            { required: true, message: "Debe seleccionar una categoría" },
          ]}
        >
          <Select>
            {data.map((d) => (
              <Select.Option key={d?._id} value={d?._id}>
                {d?.nameCategory}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* {linkImage.map((d, i) => {
          console.log(dataRegisterEdit?.photos[i])
          return (
            <div key={i} className='d-flex justify-content-between align-items-center py-3'>
              <Form.Item
                label="Foto"
                name="photo"
                style={{width: 500}}
                initialValue={dataRegisterEdit?.photos[i]}
                // onChange={(e) => changeInputBackdrop(e)}
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
                <img
                  alt="not found"
                  width={"250px"}
                  src={`https://drive.google.com/uc?id=${d}`}
                  // src={URL.createObjectURL(selectedImage)}
                />
                <br />
              </div>
            </div>
          );
        })} */}

        {/* <Form.Item
          label="Imágenes"
          name="photos"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload customRequest={dummyRequest} listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Agregar
              </div>
            </div>
          </Upload>
        </Form.Item> */}

        <Form.Item label="Pie de foto principal" name="caption">
          <Input />
        </Form.Item>

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
      </Form>
    </div>
  );
};

export default NewsAddEdit;
