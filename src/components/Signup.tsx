import { Form, Input, Button, Checkbox, DatePicker } from "antd";
import { addDays, subDays } from "date-fns";
import moment, { Moment } from "moment";
import { exit } from "process";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, useFormik, withFormik } from "formik";

import "./signup.css";

const Signup = () => {
  interface error1 {
    email?: string;
    password?: string;
    name?: string;
    bDate?: any;
    confirm?: any;
  }

  const validate = (values: any) => {
    const errors: error1 = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formik.values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be 8 characters or more";
    }

    if (values.bDate === "") {
      errors.bDate = "Required";
    }
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.confirm) {
      errors.confirm = "Required";
    }
    if (values.password !== values.confirm) {
      errors.confirm = "Both passwords dont match!!!";
    }
    //...

    return errors;
  };

  const formik = useFormik({
    // initialValues: {
    //   name: "",
    //   bDate: "",
    //   email: "",
    //   password: "",
    //   confirm: "",
    // },
    // onSubmit: (values) => {
    //   console.log("values", values);
    // },
    initialValues: {
      name: "",
      bDate: "",
      email: "",
      password: "",
      confirm: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("values.email", values);
      // console.log("values.name", formik.values.name);
      // console.log("values.password", formik.values.password);
      // console.log("values.bdate", formik.values.bDate);
      //////////////
      const usedata: any = localStorage.getItem("allUserData");
      const allUserData = JSON.parse(usedata);
      let format = moment(values.bDate).format("MM/DD/YYYY");
      console.log("format", format);
      if (allUserData.length < 1) {
        const newUserData = { ...values, bDate: format };
        allUserData.push(newUserData);
        localStorage.setItem("allUserData", JSON.stringify(allUserData));
        history.push("/login");
      } else {
        const isUserDataAvailable = allUserData.find((element: any) => {
          return element.email === values.email;
        });
        console.log("isUserDataAvailable", isUserDataAvailable);
        if (isUserDataAvailable !== undefined) {
          toast.error("EMAIL IS ALREADY TAKEN");
        } else {
          const newUserData = { ...values, bDate: format };
          allUserData.push(newUserData);
          localStorage.setItem("allUserData", JSON.stringify(allUserData));
          toast.success("SIGN UP SUCCESSFUL");
          history.push("/login");
        }
      }
    },
  });

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bDate, setBDate] = useState<string>("");
  const [allUserData, setAllUserData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("allUserData") === null) {
      localStorage.setItem("allUserData", JSON.stringify(allUserData));
    }
  }, []);

  let history = useHistory();

  // function onChange(date: any, dateString: any) {
  //   console.log("datestring", dateString);
  //   console.log("date", date);
  // }

  function disabledDate(current: any) {
    let customDate = new Date();
    return current && current > moment(customDate, "YYYY-MM-DD");
  }
  const handleSubmit = () => {
    const usedata: any = localStorage.getItem("allUserData");
    const allUserData = JSON.parse(usedata);
    let format = moment(bDate).format("MM/DD/YYYY");
    console.log("format", format);
    if (allUserData.length < 1) {
      const newUserData = { name, email, password, format };
      allUserData.push(newUserData);
      localStorage.setItem("allUserData", JSON.stringify(allUserData));
      history.push("/login");
    } else {
      const isUserDataAvailable = allUserData.find((element: any) => {
        return element.email === email;
      });
      console.log("isUserDataAvailable", isUserDataAvailable);
      if (isUserDataAvailable !== undefined) {
        toast.error("EMAIL IS ALREADY TAKEN");
      } else {
        const newUserData = { name, email, password, format };
        allUserData.push(newUserData);
        localStorage.setItem("allUserData", JSON.stringify(allUserData));
        toast.success("SIGN UP SUCCESSFUL");
        history.push("/login");
      }
      // if (element && element.email === email) {
      //
      //   return;
      // } else {
      // const newUserData = { name, email, password };
      // allUserData.push(newUserData);
      // localStorage.setItem("allUserData", JSON.stringify(allUserData));
      //   return;
      // }
    }

    // localStorage.setItem("name", name);
    // localStorage.setItem("password", password);
    // localStorage.setItem("email", email);
  };

  return (
    <div
      className="container-fluid main1"
      style={{
        height: "calc(100vh - 38px)",
        boxSizing: "border-box",
        margin: "0 auto",
      }}
    >
      <div className="row d-flex justify-content-center align-items-center h-100">
        {/* <div className="col-lg-12 col-xl-11"> */}
        {/* <div className="card text-black"> */}
        {/* <div className="card-body p-md-5"> */}
        {/* <div className="row justify-content-center"> */}
        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
            Sign up
          </p>

          <Form
            className="mx-1 mx-md-5"
            onFinish={formik.handleSubmit}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
          >
            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
              <Form.Item
                className="form-outline flex-fill mb-0"
                // rules={[{ required: true, message: "Please input your Name!" }]}
                label="Name"
                name="Name"
              >
                {/* <input
                  autoComplete="true"
                 
                 
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                /> */}
                <Input
                  name="name"
                  type="text"
                  value={formik.values.name}
                  // onChange={(e) => setName(e.target.value)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name ? (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {formik.errors.name}
                  </div>
                ) : null}
              </Form.Item>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
              <Form.Item
                className="form-outline flex-fill mb-0"
                // rules={[
                //   { required: true, message: "Please input your Email!" },
                // ]}
                label="Email"
                name="Email"
              >
                <input
                  // type="email"
                  name="email"
                  id="form3Example3c"
                  className="form-control"
                  value={formik.values.email}
                  // onChange={(e) => setEmail(e.target.value)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter email id"
                />
                {formik.errors.email ? (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {formik.errors.email}
                  </div>
                ) : null}
              </Form.Item>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
              <Form.Item
                className="form-outline flex-fill mb-0"
                // rules={[
                //   { required: true, message: "Please input your Birthdate!" },
                // ]}
                label="Birthdate"
                name="Birthdate"
              >
                {/* <input
                          type="text"
                          className="form-control"
                          value={bDate}
                          
                          required={true}
                        /> */}

                <DatePicker
                  // onChange={(dateString: any) => {
                  //   // onChange={formik.handleChange}
                  //   setBDate(dateString);
                  // }}

                  onChange={(dateString: any) =>
                    formik.setFieldValue(
                      "bDate",
                      moment(dateString).format("MM/DD/YYYY")
                    )
                  }
                  // value={formik.values.bDate}
                  // onBlur={formik.handleBlur}
                  // onChange={formik.handleChange}
                  name="bDate"
                  format="YYYY-MM-DD"
                  disabledDate={disabledDate}
                  id="form3Example3c"
                  className="form-control"
                  placeholder="Choose birthdate"
                />
                {formik.errors.bDate ? (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {formik.errors.bDate}
                  </div>
                ) : null}
              </Form.Item>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
              <Form.Item
                className="form-outline flex-fill mb-0"
                // rules={[
                //   { required: true, message: "Please input your Password!" },
                // ]}
                label="Password"
                name="password"
                hasFeedback
              >
                <Input.Password
                  type="password"
                  id="form3Example4c"
                  className="form-control"
                  name="password"
                  value={formik.values.password}
                  // onChange={(e) => setPassword(e.target.value)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password"
                />
                {formik.errors.password ? (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {formik.errors.password}
                  </div>
                ) : null}
              </Form.Item>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
              <Form.Item
                className="form-outline flex-fill mb-0"
                label="Confirm"
                // name="ConfirmPassword"
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                // rules={[
                //   {
                //     required: true,
                //     message: "Please confirm your password!",
                //   },
                //   ({ getFieldValue }) => ({
                //     validator(_, value) {
                //       if (!value || getFieldValue("password") === value) {
                //         return Promise.resolve();
                //       }
                //       return Promise.reject(
                //         new Error(
                //           "The two passwords that you entered do not match!"
                //         )
                //       );
                //     },
                //   }),
                // ]}
              >
                <Input.Password
                  type="password"
                  id="form3Example4c"
                  className="form-control"
                  name="confirm"
                  value={formik.values.confirm}
                  // onChange={(e) => setConfirmPassword(e.target.value)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password"
                />

                {formik.errors.confirm ? (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "red",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {formik.errors.confirm}
                    {/* {formik.values.confirm} */}
                  </div>
                ) : null}
              </Form.Item>
            </div>
            <div className="align-items-between">
              <Form.Item
                className="d-flex  justify-content-between mb-3 mb-lg-4"
                style={{ width: "100%" }}
              >
                <span className="d-flex justify-content-between">
                  <Button
                    htmlType="submit"
                    // type="button"
                    className="btn btn-primary btn-lg"
                    // onClick={handleSubmit}
                  >
                    Register
                  </Button>
                  <Link to="/login">Already have an account? Login here</Link>
                </span>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
          {/* <img
                    src="https://i.imgur.com/cEmbD0i.jpg"
                    className="img-fluid"
                    alt="Sample image"
                  /> */}
          <svg
            id="e08049af-74c5-410b-9b01-8d98ea218704"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width="1031.0225"
            height="768.03937"
            viewBox="0 0 1031.0225 768.03937"
            style={{ height: "100%" }}
          >
            <path
              d="M1009.71971,796.73761c29.53212-21.542,49.88024-58.5391,43.42051-94.51752a168.419,168.419,0,0,1-101.11791,56.08654c-15.15294,2.32707-32.249,3.33756-42.496,14.74048-6.37613,7.095-8.71694,17.09738-8.36211,26.62957.3551,9.53264,3.13768,18.78684,5.89891,27.91775l-.43694,2.34088C943.03365,826.66483,980.18758,818.27964,1009.71971,796.73761Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#f0f0f0"
            />
            <path
              d="M1052.37389,702.25263a143.95292,143.95292,0,0,1-53.48484,70.59563,61.991,61.991,0,0,1-17.31535,8.79946,35.55475,35.55475,0,0,1-18.71036.26727c-5.76279-1.361-11.49989-3.42042-17.49316-3.35683a21.77023,21.77023,0,0,0-16.057,7.69151c-5.09351,5.705-7.83335,12.89994-10.26818,20.02911-2.70341,7.91558-5.386,16.18022-11.42127,22.25556-.73125.73612.4537,1.82774,1.18385,1.09274,10.50035-10.57,10.86942-26.66009,18.92622-38.70532,3.75944-5.62053,9.23549-10.14216,16.19269-10.68778,6.08377-.47712,12.00174,1.64155,17.82478,3.07a37.93951,37.93951,0,0,0,18.30444.42031,57.30938,57.30938,0,0,0,17.58978-8.10128,139.66007,139.66007,0,0,0,32.165-29.50821,146.50558,146.50558,0,0,0,24.13719-43.51611c.34035-.97655-1.23562-1.31621-1.57375-.346Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#fff"
            />
            <path
              d="M1007.20431,767.73937a21.59753,21.59753,0,0,0,27.759,3.40075c.86377-.57306.01385-1.94224-.85107-1.36842a19.99883,19.99883,0,0,1-25.8152-3.21618c-.69895-.76562-1.78769.42262-1.09274,1.18385Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#fff"
            />
            <path
              d="M965.69442,782.98988a41.62751,41.62751,0,0,1,11.94665-27.88557c.72863-.73867-.4561-1.83052-1.18385-1.09273a43.29887,43.29887,0,0,0-12.37259,29.04273c-.03,1.03828,1.57994.96821,1.60979-.06443Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#fff"
            />
            <path
              d="M1038.21911,732.52528a12.22522,12.22522,0,0,1-5.10593-10.41618c.04316-1.03738-1.56691-.9662-1.60979.06443a13.69941,13.69941,0,0,0,5.623,11.53561.83261.83261,0,0,0,1.13829-.04556.80963.80963,0,0,0-.04555-1.1383Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#fff"
            />
            <path
              d="M945.3282,641.4392c-.04538.647-.09075,1.294-.1477,1.94817a160.99957,160.99957,0,0,1-4.06771,25.79777c-.14826.65775-.30842,1.32211-.47527,1.97424a169.72941,169.72941,0,0,1-26.24214,56.71214,164.82885,164.82885,0,0,1-16.04723,19.22734c-8.05047,8.276-17.43771,16.60867-22.14545,26.76192a28.2756,28.2756,0,0,0-1.30937,3.24556l28.91091,52.11435c.12514.08546.23877.17807.36423.26411l1.05918,2.13355c.32221-.28808.65021-.5938.97242-.88188.1876-.16633.36876-.34427.55636-.51061.123-.11456.24581-.22975.36338-.3261.04109-.038.08186-.07654.11113-.108.11757-.09635.21654-.19833.32221-.28808q2.75716-2.55569,5.488-5.159c.01191-.00661.01191-.00661.01737-.02482,13.838-13.25947,26.69053-27.79068,36.929-43.81071.30788-.48209.628-.9702.92265-1.47609a157.28386,157.28386,0,0,0,11.88531-22.74947,139.04733,139.04733,0,0,0,4.77035-13.23559,115.62619,115.62619,0,0,0,4.91637-35.81609c-.50051-24.16626-8.72424-47.90343-25.83422-64.53488C946.20991,642.27191,945.7781,641.85775,945.3282,641.4392Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#f0f0f0"
            />
            <path
              d="M944.73175,641.9233a143.95284,143.95284,0,0,1-.20121,88.56822,61.99109,61.99109,0,0,1-8.52745,17.45093,35.55474,35.55474,0,0,1-14.77827,11.47832c-5.42065,2.383-11.24134,4.19272-15.98834,7.85185a21.77018,21.77018,0,0,0-8.18983,15.80869c-.63208,7.62176,1.51216,15.0161,3.86034,22.17427,2.6072,7.94779,5.4412,16.16175,4.28014,24.64622-.14067,1.028,1.46268,1.18618,1.60314.15973,2.02-14.76153-7.37258-27.83073-8.19175-42.29893-.38224-6.75112,1.26774-13.65834,6.49418-18.28271,4.57029-4.0438,10.571-5.91519,16.08042-8.28054a37.93946,37.93946,0,0,0,14.86813-10.68494,57.30886,57.30886,0,0,0,9.16692-17.05869,139.66,139.66,0,0,0,7.916-42.92619,146.50568,146.50568,0,0,0-6.92751-49.27744c-.31621-.98464-1.779-.307-1.46489.67121Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#fff"
            />
            <path
              d="M948.09391,721.406a21.59753,21.59753,0,0,0,24.2115-13.99754c.34465-.9776-1.1583-1.5591-1.50342-.5802a19.99884,19.99884,0,0,1-22.54835,12.9746c-1.019-.19049-1.17293,1.41374-.15973,1.60314Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#fff"
            />
            <path
              d="M924.13244,758.5745a41.62749,41.62749,0,0,1-7.2503-29.45777c.137-1.02847-1.46627-1.187-1.60314-.15973a43.29884,43.29884,0,0,0,7.60691,30.63815c.60115.84708,1.84442-.17817,1.24653-1.02065Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#fff"
            />
            <path
              d="M951.65618,674.61648a12.22525,12.22525,0,0,1-10.34806-5.24262c-.59012-.85428-1.83281.17193-1.24654,1.02065a13.69939,13.69939,0,0,0,11.43487,5.82511.83261.83261,0,0,0,.88143-.72171.8096.8096,0,0,0-.7217-.88143Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#fff"
            />
            <path
              d="M554.38758,111.63859c3.717-3.29835,7.61541-6.47947,11.5877-9.45459l1.45874,1.94609c-3.91864,2.936-7.76507,6.07414-11.43164,9.32807Zm23.91925-17.916c4.207-2.63673,8.57785-5.12954,12.98993-7.40973l1.11712,2.16139c-4.3533,2.24893-8.66485,4.70792-12.81488,7.309Zm26.549-13.717c4.577-1.90337,9.29687-3.642,14.02945-5.16924l.74728,2.31531c-4.67,1.506-9.327,3.22217-13.84259,5.09975Zm28.99243-6.81175-.55707-2.36725c4.841-1.13876,9.77988-2.09,14.67859-2.82778l.36212,2.4057C643.49808,71.13208,638.62519,72.0705,633.84827,73.19384Zm29.14652-4.3827-.16269-2.42692c4.954-.33179,9.98245-.46019,14.94574-.38142l-.03833,2.43259c-4.89686-.0783-9.85761.04845-14.74469.37571Zm29.4703.47215.24042-2.42012c4.94232.49106,9.92688,1.19634,14.81476,2.09613L707.08,71.35166c-4.82221-.88807-9.73929-1.58391-14.61484-2.06841ZM783.62882,389.7815c3.885-2.97574,7.69647-6.15384,11.329-9.44678l1.63366,1.8024c-3.68219,3.33777-7.54553,6.55945-11.48327,9.57529ZM721.47229,74.6211l.636-2.34757c4.79047,1.29885,9.5889,2.81468,14.26285,4.50527l-.82733,2.28689C730.93241,77.39812,726.19806,75.90242,721.47229,74.6211Zm83.9971,295.36331c3.34443-3.577,6.58252-7.33856,9.62366-11.18021l1.90741,1.51026c-3.08282,3.89361-6.36481,7.70593-9.75445,11.33084ZM749.20188,84.65184l1.01239-2.21232c4.51611,2.06732,9.00079,4.34653,13.33124,6.77572l-1.18958,2.121C758.0831,88.9399,753.65775,86.69065,749.20188,84.65184Zm74.56689,262.22039c2.71753-4.07837,5.2984-8.31879,7.67127-12.60391l2.12793,1.17859c-2.40516,4.34259-5.02076,8.64053-7.77436,12.77371ZM774.9177,99.07429l1.35913-2.01658c4.11651,2.77448,8.16937,5.75454,12.04547,8.85729l-1.5199,1.89884C782.97757,104.7524,778.97928,101.81214,774.9177,99.07429Zm63.13623,222.005c2.01507-4.46689,3.8695-9.07242,5.511-13.68753l2.29224.81491c-1.66437,4.67816-3.54327,9.34525-5.58557,13.87262Zm-40.126-203.58335,1.67059-1.7675c3.61,3.41252,7.119,7.01455,10.42994,10.70678l-1.81116,1.62362C804.95121,124.41636,801.48917,120.86284,797.92789,117.49594ZM847.93308,293.2977c1.25781-4.743,2.33142-9.59017,3.19086-14.40683l2.39514.42733c-.87177,4.88244-1.96015,9.79548-3.23432,14.60283Zm-30.3346-153.86458,1.93854-1.469c2.99689,3.95681,5.86377,8.08613,8.52057,12.27379l-2.0542,1.30275C823.38285,147.40984,820.555,143.336,817.59848,139.43312ZM853.11307,264.269c.458-4.876.71674-9.834.76856-14.73566l2.43188.02625c-.05237,4.96807-.31433,9.99376-.77875,14.9371Zm-19.73218-99.95648,2.155-1.12772c2.30029,4.39272,4.44684,8.942,6.38062,13.52034l-2.24079.94633c-1.908-4.51689-4.02551-9.00441-6.29474-13.33895Zm20.04431,70.47258c-.35321-4.876-.916-9.80741-1.6734-14.6568l2.40357-.37506c.76715,4.915,1.33813,9.91354,1.69574,14.85594Zm-8.5755-43.32145,2.31086-.75961c1.54815,4.70932,2.92584,9.563,4.08728,14.38277l-2.36512.57c-1.14575-4.76-2.50567-9.54531-4.03295-14.19317Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#f0f0f0"
            />
            <path
              d="M803.0911,468.34868l16.62011-55.55908-31.55078-7.74023-11.61377,56.58368-19.854,79.37072a15.0079,15.0079,0,1,0,20.62012,7.19581l.30566.10186Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#9e616a"
            />
            <path
              d="M930.21235,468.39269l-1.3104-57.97692-32.40056,2.35947,6.38885,57.40884,5.57193,81.62627a15.00789,15.00789,0,1,0,21.83409.49109l.32218.00272Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#9e616a"
            />
            <polygon
              points="706.223 748.029 686.312 748.029 680.088 671.229 706.227 671.23 706.223 748.029"
              fill="#9e616a"
            />
            <path
              d="M795.78977,833.31057l-64.201-.00238v-.812a24.98827,24.98827,0,0,1,24.989-24.98857h.00159l39.21161.00159Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#2f2e41"
            />
            <polygon
              points="813.413 748.029 793.502 748.029 784.03 671.229 813.417 671.23 813.413 748.029"
              fill="#9e616a"
            />
            <path
              d="M902.97947,833.31057l-64.201-.00238v-.812a24.98825,24.98825,0,0,1,24.989-24.98857h.00159l39.21161.00159Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#2f2e41"
            />
            <path
              d="M894.37015,789.43621h-.00049c-.14819,0-.29614-.00488-.44507-.01367l-17.13769-.95313a7.79821,7.79821,0,0,1-7.31861-6.86035L848.4766,594.68523a1.93661,1.93661,0,0,0-3.55811-.791l-26.74756,42.34961a61.7537,61.7537,0,0,0-9.03076,24.76464L795.55081,773.28094a7.84612,7.84612,0,0,1-7.73877,6.76855H768.79569a7.80217,7.80217,0,0,1-7.79981-7.42676l-4.3435-101.73535a114.10907,114.10907,0,0,1,5.74218-41.82324l40.94-104.77735.238-.06738,98.5459-28.1582.04492,285.77734a7.80962,7.80962,0,0,1-7.79321,7.59766Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#2f2e41"
            />
            <polygon
              points="795.712 293.494 743.328 293.494 704.628 312.056 717.773 459.712 816.13 462.321 836.284 315.842 795.712 293.494"
              fill="#6c63ff"
            />
            <polygon
              points="822.37 320.527 836.284 315.842 860.37 371.527 807.732 389.538 822.37 320.527"
              fill="#6c63ff"
            />
            <polygon
              points="724.37 318.527 704.628 312.056 674.63 361.275 724.37 387.157 724.37 318.527"
              fill="#6c63ff"
            />
            <circle cx="771.13611" cy="250.33272" r="30.28839" fill="#9e616a" />
            <path
              d="M864.77391,273.77481c-5.14924-.84421-10.27332.59793-15.39753.76511-2.52057.0822-5.05212-.23058-7.56036.02876s-5.103,1.2045-6.58716,3.24307c-1.03815,1.426-1.51562,3.34136-2.99762,4.29775-1.1557.74576-2.6781.72377-3.842,1.4566-2.24151,1.41136-2.15491,4.8139-3.95746,6.75478-.85736.92309-2.118,1.48166-2.72686,2.58459a5.5991,5.5991,0,0,0-.51288,2.31427l-.87445,11.596a2.09783,2.09783,0,0,0,2.184,2.80118c2.09356.28543,4.64087.38721,5.85724-1.34048,1.43878-2.04352.3482-5.83814,2.71948-6.62747,2.101-.69934,3.79632,2.24844,6.0097,2.3099,1.66846.04633,2.8609-1.51025,3.94043-2.78326s2.86524-2.481,4.29108-1.61339c1.18976.724,1.28552,2.4312,2.18249,3.49657,1.3548,1.60913,3.93763,1.2073,5.8537.3392s3.90052-2.0929,5.96186-1.67377c2.88006.58557,4.36566,4.07767,7.18267,4.9155,4.03455,1.19992,8.375-3.6152,12.15491-1.76321,1.77155.868,2.61725,2.93237,2.91828,4.882s.21746,3.97349.83563,5.8469,2.23511,3.6398,4.20617,3.559a5.90334,5.90334,0,0,1,.933-3.84409c.58465-.88626,1.40484-1.6054,1.93512-2.52517,1.83417-3.1814-.394-7.18833.04785-10.83393.11139-.919.39581-1.81691.42181-2.74228.07013-2.49386-1.69336-4.6175-3.35534-6.47821l-1.953-2.1865a45.04223,45.04223,0,0,0-5.71148-5.67348,57.32383,57.32383,0,0,1-4.7378-3.625C871.15251,278.32353,869.2664,274.51144,864.77391,273.77481Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#2f2e41"
            />
            <path
              d="M194.20615,553.878V170.55388A6.29776,6.29776,0,0,1,200.497,164.263H750.32756a6.29776,6.29776,0,0,1,6.29088,6.29088V553.878a6.29776,6.29776,0,0,1-6.29088,6.29088H200.497A6.29776,6.29776,0,0,1,194.20615,553.878Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#fff"
            />
            <path
              d="M200.497,564.16912a10.31562,10.31562,0,0,1-10.29089-10.28662V170.55388a10.31559,10.31559,0,0,1,10.28637-10.291H750.32767a10.31559,10.31559,0,0,1,10.29077,10.28662V553.8781a10.31559,10.31559,0,0,1-10.28638,10.291Zm-2.29089-10.29541a2.30172,2.30172,0,0,0,2.29541,2.29541H750.32767a2.30074,2.30074,0,0,0,2.29077-2.29541V170.55388a2.30078,2.30078,0,0,0-2.29541-2.291H200.497a2.30077,2.30077,0,0,0-2.29089,2.29541Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#e4e4e4"
            />
            <path
              id="bace2d87-5197-4941-a2a9-430573aeaafe"
              data-name="feda1070-6288-4949-b833-330f4749d65f"
              d="M660.01947,253.799a4.9881,4.9881,0,0,1,0,9.97485H534.96881a4.9881,4.9881,0,1,1-.16378-9.97485q.0819-.00139.16378,0Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#e4e4e4"
            />
            <path
              id="ba69297a-a537-49da-8190-55cdd7d824eb"
              data-name="feda1070-6288-4949-b833-330f4749d65f"
              d="M660.01947,289.05434a4.9881,4.9881,0,0,1,0,9.97486H534.96881a4.9881,4.9881,0,1,1-.16378-9.97486q.0819-.00138.16378,0Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#e4e4e4"
            />
            <path
              id="e3ca5171-b1a6-4df2-b5f4-d6c1a2a8204f"
              data-name="feda1070-6288-4949-b833-330f4749d65f"
              d="M660.01947,324.30974a4.9881,4.9881,0,0,1,0,9.97485H534.96881a4.9881,4.9881,0,1,1-.16378-9.97485q.0819-.00139.16378,0Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#e4e4e4"
            />
            <path
              d="M580.33581,378.81108a17.07649,17.07649,0,1,1,17.0765,17.07649A17.07649,17.07649,0,0,1,580.33581,378.81108Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#6c63ff"
            />
            <path
              d="M590.67435,377.12661h5.05342v-5.05347a1.68451,1.68451,0,0,1,3.369-.00574v5.05921h5.05348a1.68448,1.68448,0,0,1,0,3.369h-5.05348v5.05349a1.68451,1.68451,0,0,1-3.369,0v-5.05347h-5.05342a1.68448,1.68448,0,1,1-.00634-3.369h.00634Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#fff"
            />
            <path
              d="M420.33017,299.15482a66.62891,66.62891,0,0,1-4.19955,23.36409,64.80064,64.80064,0,0,1-4.6412,9.89547,66.9384,66.9384,0,0,1-116.15457,0q-.88991-1.54266-1.68774-3.13148a66.92355,66.92355,0,1,1,126.68306-30.12808Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#e4e4e4"
            />
            <circle cx="272.40242" cy="231.67828" r="12.79336" fill="#6c63ff" />
            <path
              d="M293.64718,329.2829c5.63666-6.09154,13.172-15.76285,20.23922-8.77472,3.5468,3.29629,9.09775,11.46449,14.41137,6.1245L369.79145,285.139a8.23754,8.23754,0,0,1,11.78093.211l34.55829,37.16895a64.81972,64.81972,0,0,1-4.64117,9.89545H295.33488Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#fff"
            />
            <path
              id="b7942184-1937-424d-bfb8-0f5cbccd1754"
              data-name="Path 680"
              d="M411.52114,485.79939a3.19948,3.19948,0,1,0,0,6.39895H445.095a3.19948,3.19948,0,1,0,0-6.39895Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#6c63ff"
            />
            <path
              id="fb1c7c97-2f14-459a-90b9-db1c1611151d"
              data-name="Path 680"
              d="M260.261,438.806a3.19947,3.19947,0,0,0,0,6.399H446.56355a3.19948,3.19948,0,0,0,0-6.399Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#e5e5e5"
            />
            <path
              id="a8d81b82-d579-4ad6-943a-4e62cbc3ee6d"
              data-name="Path 680"
              d="M260.261,462.30268a3.19947,3.19947,0,0,0,0,6.399H446.56355a3.19948,3.19948,0,0,0,0-6.399Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#e5e5e5"
            />
            <path
              id="ad508716-dd53-4b89-baf2-189976f7f922"
              data-name="Path 680"
              d="M655.52114,485.79939a3.19948,3.19948,0,1,0,0,6.39895H689.095a3.19948,3.19948,0,1,0,0-6.39895Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#6c63ff"
            />
            <path
              id="a72d9b4a-b989-4cba-a906-09fc03867249"
              data-name="Path 680"
              d="M504.261,438.806a3.19947,3.19947,0,0,0,0,6.399H690.56355a3.19947,3.19947,0,0,0,0-6.399Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#e5e5e5"
            />
            <path
              id="bffef029-080d-4bbe-bc48-e2786c2c075f"
              data-name="Path 680"
              d="M504.261,462.30268a3.19947,3.19947,0,0,0,0,6.399H690.56355a3.19947,3.19947,0,0,0,0-6.399Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#e5e5e5"
            />
            <path
              d="M416.39261,616.63178c-2.78131,4.11816-5.76758,8.16785-8.87646,12.03632l-1.89636-1.52283c3.06665-3.81726,6.01318-7.81238,8.75671-11.875ZM397.67246,639.927c-3.42035,3.599-7.0351,7.09924-10.74262,10.40375l-1.61889-1.81623c3.65832-3.25964,7.22406-6.7124,10.59808-10.26269Zm-22.31037,19.881c-3.96087,2.98047-8.101,5.83691-12.306,8.49164l-1.29889-2.05719c4.14959-2.61865,8.23443-5.43769,12.14227-8.37793Zm-26.39221,13.79907,1.12757,2.15473c-4.4065,2.30542-8.95435,4.45349-13.51636,6.38476l-.94824-2.24042C340.13456,678.00086,344.62168,675.88154,348.96988,673.60706Zm-27.14477,11.48432.76031,2.31048c-4.71637,1.55182-9.55536,2.925-14.38269,4.08142l-.567-2.3659c4.76287-1.14045,9.53668-2.49524,14.18939-4.02607Zm-28.66419,6.862.36823,2.404c-4.90943.75177-9.913,1.30658-14.87116,1.649l-.16766-2.42675c4.89166-.33753,9.82745-.88471,14.67059-1.62629ZM125.25379,404.13892c-3.0242,3.84735-5.92694,7.87256-8.62775,11.96448l-2.03012-1.34021c2.73782-4.14771,5.68-8.228,8.74533-12.12732ZM263.73691,693.987l-.03308,2.432c-4.96295-.06836-9.98755-.345-14.93488-.82171l.23346-2.42072C253.88358,693.64649,258.841,693.91956,263.73691,693.987Zm-154.72244-265.247c-2.35126,4.29547-4.55365,8.74347-6.54538,13.22l-2.22275-.9892c2.01923-4.53729,4.25153-9.04523,6.63464-13.39844ZM234.38492,691.1576l-.43121,2.39447c-4.888-.88092-9.79828-1.97492-14.59632-3.25244l.62555-2.35c4.734,1.26,9.57935,2.33966,14.402,3.20789ZM97.02866,455.67292c-1.61945,4.62555-3.06628,9.37408-4.30057,14.11426l-2.354-.61316c1.25128-4.8039,2.71747-9.61676,4.35824-14.30432Zm108.8642,227.90094-.81568,2.291c-4.67663-1.66516-9.34259-3.54529-13.86786-5.58813l1.00061-2.21686C196.67533,680.07545,201.2786,681.93055,205.89286,683.57386ZM89.59711,484.20563c-.84253,4.8274-1.495,9.74921-1.93884,14.62738l-2.42282-.22c.45031-4.94494,1.1112-9.93243,1.96508-14.82519Zm89.43131,187.23865-1.17926,2.127c-4.34443-2.409-8.63807-5.02667-12.76233-7.78088l1.35113-2.02258C170.50638,666.48505,174.74247,669.06739,179.02842,671.44428Zm-92.101-157.874c-.04043,4.90674.12348,9.86871.48728,14.74792l-2.42621.181c-.3682-4.946-.53412-9.9754-.49381-14.94861ZM154.52573,655.0799l-1.51291,1.90448c-3.88568-3.0885-7.68832-6.3764-11.302-9.773l1.66626-1.77209C146.9415,648.78974,150.69257,652.03358,154.52573,655.0799ZM89.1193,542.976c.76736,4.837,1.7481,9.70386,2.91528,14.46484l-2.36221.57855c-1.18317-4.82543-2.17758-9.75866-2.95548-14.66247Zm43.93936,91.92383-1.80734,1.62756c-3.31922-3.68378-6.52839-7.55743-9.53864-11.512l1.93555-1.47321C126.61826,627.44373,129.784,631.26472,133.05866,634.89985Zm-36.919-63.2862c1.55319,4.63556,3.32306,9.27259,5.26117,13.782l-2.23511.96026c-1.96377-4.57049-3.75839-9.27057-5.33227-13.9693Zm19.06619,39.83417-2.0498,1.30975c-2.66925-4.17724-5.20926-8.53668-7.53137-12.917l2.14944-1.13952C110.06632,603.02729,112.57209,607.325,115.20584,611.44782Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#f0f0f0"
            />
            <path
              d="M1114.32057,834.01969h-647.294a1.19069,1.19069,0,0,1,0-2.38137h647.294a1.19068,1.19068,0,0,1,0,2.38137Z"
              transform="translate(-84.48875 -65.98031)"
              fill="#cacaca"
            />
          </svg>
        </div>
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Signup;
