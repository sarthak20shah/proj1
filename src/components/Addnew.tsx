import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useHistory } from "react-router";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function Addnew() {
  const onFinish = (values: any) => {
    console.log(values);
  };
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let latestData: any = localStorage.getItem("tableData");
    // console.log("latestData", latestData);
    let newData = JSON.parse(latestData);
    // console.log("newData", newData);
    // console.log("last_id", newData[newData.length - 1].id);
    newData.push({
      id: newData[newData.length - 1].id + 1,
      name: name,
      email: email,
    });
    // console.log("newData", newData);
    localStorage.setItem("tableData", JSON.stringify(newData));
    history.push("/table");
  };

  return (
    <div
      className="container-fluid main1"
      style={{
        boxSizing: "border-box",
        margin: "0 auto",
      }}
    >
      <div
        className="row d-flex justify-content-center align-items-center h-100"
        style={{ marginTop: "150px", marginRight: "10px" }}
      >
        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
            <Form.Item name={["user", "name"]} label="Name">
              <Input
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[{ type: "email" }]}
            >
              <Input
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            {/* <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[{ required: true }]}
        >
          <Input
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Item> */}
            {/* <Form.Item name={["user", "website"]} label="Website">
          <Input />
        </Form.Item> */}
            {/* <Form.Item name={["user", "introduction"]} label="Introduction">
          <Input.TextArea />
        </Form.Item> */}
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Addnew;
