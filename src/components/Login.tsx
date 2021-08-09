import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "./Login.css";

const Login = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = (e: any) => {
    // e.preventDefault();
    // console.log(name + "" + password);
    let allUserData: any = localStorage.getItem("allUserData");
    let all = JSON.parse(allUserData);
    console.log("all", all);
    // let password1 = localStorage.getItem("password");
    // console.log(email1 + "   " + password1);
    let arr = all.filter((item: any) => {
      return item.email == name && item.password == password;
    });
    console.log("arr", arr);
    if (arr.length !== 0) {
      history.push("/table");
      toast.success("login successful");
      // check --> if --> arr.bday === today's date { toste}
      let dx = new Date();
      let dz = moment(dx).format("DD/MM/YYYY");
      console.log("dz", dz);
      console.log("bDate", arr[0].format);
      let x: boolean = true;
      if (dz[0] !== arr[0].format[0]) x = false;
      if (dz[1] !== arr[0].format[1]) x = false;
      if (dz[2] !== arr[0].format[2]) x = false;
      if (dz[3] !== arr[0].format[3]) x = false;
      if (dz[4] !== arr[0].format[4]) x = false;

      if (x) {
        toast.success("happy birthday", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("enter correct login information");
    }

    // if (email1 === name && password === password1) {
    //   history.push("/table");
    //   toast.success("logged in");
    // } else {
    //   toast.error("try to log in again with correct info");
    // }

    // const usedata: any = localStorage.getItem("allUserData");
    // const allUserData = JSON.parse(usedata);
    // if (allUserData.length < 1) {
    //   // const newUserData = { name, email, password };
    //   allUserData.push(newUserData);
    //   // localStorage.setItem("allUserData", JSON.stringify(allUserData));
    //   history.push("/login");
    // } else {
    //   const isUserDataAvailable = allUserData.find((element: any) => {
    //     return element.email === email;
    //   });
    //   console.log("isUserDataAvailable", isUserDataAvailable);
    //   if (isUserDataAvailable !== undefined) {
    //     toast.error("EMAIL IS ALREADY TAKEN");
    //   } else {
    //     const newUserData = { name, email, password };
    //     allUserData.push(newUserData);
    //     localStorage.setItem("allUserData", JSON.stringify(allUserData));
    //     toast.success("SIGN UP SUCCESSFUL");
    //     history.push("/login");
  };

  return (
    <>
      <div style={{ backgroundColor: "yellowgreen" }}>
        <div className="row justify-content-center">
          <div className="form-group col-md-4 col-md-offset-5 align-center">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="jhakjhakhs"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  value={password}
                  id="fshgsfhasfa"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button btn float-right login_btn"
                  // onClick={() => handleSubmit}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div>
        <img
          src="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg"
          width="100%"
          height="100%"
        ></img>
      </div>
    </>
  );
};

export default Login;
