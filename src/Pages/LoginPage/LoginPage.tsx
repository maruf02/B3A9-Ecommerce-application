import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";

import {
  useForgotPasswordMutation,
  useLoginMutation,
  usePostLoginActivityMutation,
} from "../../Redux/features/auth/authApi";
import { verifyToken } from "../../Redux/verifyToken";
import { setUser } from "../../Redux/features/auth/authSlice";
import Navbar from "../../Navbar/Navbar";

import Swal from "sweetalert2";
import { Form, Input } from "antd";
import {
  useGetUserEmailQuery,
  useUpdatePasswordMutation,
} from "../../Redux/user/userApi";
import moment from "moment";
import Bowser from "bowser";
import { BiHide, BiShow } from "react-icons/bi";

type FieldType = {
  password?: string;
};

type User = {
  role?: string;
};
interface ErrorResponse {
  data?: {
    message?: string;
  };
}

const LoginPage = () => {
  // const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const [resetLink, setResetLink] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [showResetLink, setShowResetLink] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { data: userData, isError } = useGetUserEmailQuery(email);
  const [updatePassword] = useUpdatePasswordMutation();
  const [login] = useLoginMutation();
  const [postLoginActivity] = usePostLoginActivityMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  // login portion
  console.log(userData);
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    // const userInfo = {
    //   email: data.email,
    //   password: data.password,
    // };
    const userInfo = { email, password };
    console.log("userInfo", userInfo);
    const formattedDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const loginAt = formattedDateTime;
    const browser = Bowser.getParser(window.navigator.userAgent);
    const browserName = browser.getBrowser().name;
    const browserVersion = browser.getBrowser().version;
    const osName = browser.getOS().name;
    const osVersion = browser.getOS().version;
    const platformType = browser.getPlatformType();
    const device = `${browserName},${browserVersion},${osName},${osVersion},${platformType}`;

    const loginActivityInfo = { email, loginAt, device };

    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);
      const { role } = user as User;
      //   console.log("User data:", role);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      await postLoginActivity(loginActivityInfo).unwrap();
      navigate(`/DashBoard/${role}`);
    } catch (err) {
      const error = err as ErrorResponse;
      if (error.data?.message) {
        // console.error("Login error:", err.data.message);
        Swal.fire("Error", error.data.message as string, "error");
      } else {
        // console.error("Login error:", err);
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    }
  };

  // login portion

  // **************************************

  const handleResetPass = () => {
    const modal = document.getElementById(
      "ForgetPassModal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
    setShowSuccessModal(true);
  };
  // **************************************

  // **************************************

  const handleEmailConfirmForReset = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = form.email.value;

    setEmail(email);

    try {
      // Trigger the forgot password mutation
      await forgotPassword(email).unwrap();
      setShowSuccessModal(false);
      Swal.fire({
        title: "Success!",
        text: "Check your email!",
        icon: "success",
      });
    } catch (error: any) {
      setShowSuccessModal(false);
      Swal.fire({
        title: "Error!",
        text: "Email not found, please try again.",
        icon: "error",
      });
    }

    // console.log("email", isError);

    // console.log("object", userData);
  };
  // **************************************

  // **************************************
  const updateNewPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const emailT = form.emailT.value;
    const password = form.password.value;
    // console.log("object", email, password);
    // console.log("object", error);
    try {
      await updatePassword({
        email: emailT,
        password: password,
      }).unwrap();
      Swal.fire("Success", "Password updated successfully!", "success");
      const modal = document.getElementById(
        "ResetPassModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update password.", "error");
    }
  };
  // **************************************
  const handleSetDefaults = (role: string) => {
    if (role === "user") {
      setEmail("mku@mk.com");
      setPassword("mku");
    } else if (role === "vendor") {
      setEmail("mkv@mk.com");
      setPassword("mkv");
    } else if (role === "admin") {
      setEmail("admin@admin.com");
      setPassword("admin1234");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // **************************************

  return (
    <div className="min-h-screen bg-white">
      <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
        <div className="w-full max-w-full   flex-0">
          {/* <!-- Navbar --> */}
          <Navbar />
        </div>

        <main className="mt-0 transition-all duration-200 ease-soft-in-out">
          <section
            className="w-full h-full min-h-screen  bg-black  bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg')",
            }}
          >
            <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen">
              <div className="container z-10 ">
                <div className="flex flex-wrap mt-0 -mx-3  ">
                  <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12 bg-white card   shadow-xl">
                    <div className="relative flex flex-col min-w-0  break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                      <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                        <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">
                          Welcome back
                        </h3>
                        <p className="mb-0">
                          Enter your email and password to sign in
                        </p>
                      </div>
                      {/* credential button */}
                      <div className="border border-1 border-slate-400 p-2 rounded-lg my-2 flex flex-col justify-center items-center">
                        <p className="mb-0">
                          Enter your email and password to sign in
                        </p>
                        <div className="flex flex-row gap-2">
                          <div>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleSetDefaults("user")}
                            >
                              User
                            </button>
                          </div>
                          <div>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleSetDefaults("vendor")}
                            >
                              Vendor
                            </button>
                          </div>
                          <div>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleSetDefaults("admin")}
                            >
                              Admin
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* credential button */}
                      <div className="flex-auto p-6">
                        {/* sign in form start */}

                        <form onSubmit={handleLogin}>
                          <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                            Email
                          </label>
                          <div className="mb-4">
                            <input
                              type="email"
                              name="email"
                              defaultValue={email}
                              required
                              className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                              placeholder="Enter Your Email"
                            />
                          </div>
                          {/* <div className="mb-4">
                            <input
                              type="password"
                              name="password"
                              value={password}
                              required
                              className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                              placeholder="Enter Your Email"
                            />
                          </div> */}
                          <div className="mb-4 relative">
                            <input
                              type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                              placeholder="Enter Your Password"
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute right-3 top-2.5 text-gray-600"
                              style={{
                                background: "transparent",
                                border: "none",
                              }}
                            >
                              {showPassword ? <BiHide /> : <BiShow />}
                            </button>
                          </div>

                          {/* <Form.Item<FieldType>
                            // label="Password"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your password!",
                              },
                            ]}
                          >
                            <Input.Password defaultValue={password} />
                          </Form.Item> */}

                          <div className="text-center">
                            <button className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85">
                              Sign in
                            </button>
                          </div>
                        </form>
                        {/* <div className="text-center">
                          <button className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85">
                            Sign in
                          </button>
                        </div> */}
                        {/* </form> */}
                        {/* sign in form start */}
                        {/* ********************************* */}
                        <div className="flex mx-auto justify-center pt-0 z-0">
                          <button
                            onClick={() => {
                              const modal = document.getElementById(
                                "ForgetPassModal"
                              ) as HTMLDialogElement;
                              if (modal) {
                                modal.showModal();
                              }
                            }}
                            className="pt-3 mx-auto text-green-700   flex justify-between"
                          >
                            <a className="text-center font-semibold">
                              Forgot Your password?
                            </a>
                          </button>
                          <dialog id="ForgetPassModal" className="modal  ">
                            <div className="modal-box bg-[#1A4870]  ">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                  ✕
                                </button>
                              </form>
                              <form onSubmit={handleEmailConfirmForReset}>
                                <div className="flex justify-center pt-5 ">
                                  <h1 className="text-white text-3xl ">
                                    Reset Your Password
                                  </h1>
                                </div>
                                <p className="border border-1 border-gray-400 my-3 "></p>
                                <div className="flex flex-col gap-2">
                                  <div>
                                    <label className="pr-12 text-white">
                                      Email:
                                    </label>
                                    <input
                                      type="email"
                                      //   defaultValue="abc@gmai.com"
                                      required
                                      name="email"
                                      placeholder="Enter your Email"
                                      className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                                    />
                                  </div>

                                  <div className="flex justify-center my-5  ">
                                    <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md justify-center w-full text-2xl pb-1 ">
                                      confirm Your Email
                                    </button>
                                  </div>
                                  <div className="text-lg pt-3 text-center"></div>
                                </div>
                              </form>
                              {isError ? (
                                <p className="text-red-500 text-md">
                                  Please Enter created Email Or Create ne
                                  account
                                </p>
                              ) : (
                                <button
                                  onClick={handleResetPass}
                                  className="text-green-500 text-xl"
                                >
                                  {/* Reset Link: {resetLink} */}
                                </button>
                              )}
                            </div>
                          </dialog>
                        </div>
                        {/* **************************************************** */}
                      </div>
                      <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                        <p className="mx-auto mb-6 leading-normal text-lg  ">
                          Don't have an account?
                          <Link to="/signup">
                            <span className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text pl-2">
                              Sign up
                            </span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                    <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                      <div
                        className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10"
                        style={{
                          backgroundImage:
                            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                        }}
                      ></div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* **************************************************** */}
        {/* Success Modal */}
        {showSuccessModal && (
          <dialog id="ResetPassModal" open className="modal">
            <div className="modal-box bg-[#1A4870]">
              <div>
                <form onSubmit={updateNewPassword}>
                  <div className="flex justify-center pt-5 ">
                    <h1 className="text-white text-3xl ">Set New Password</h1>
                  </div>
                  <p className="border border-1 border-gray-400 my-3 "></p>
                  <div className="flex flex-col gap-2">
                    <div>
                      <label className="pr-12 text-white">Email:</label>
                      <input
                        type="email"
                        defaultValue={email}
                        readOnly
                        name="emailT"
                        placeholder="Enter your Email"
                        className="input input-bordered input-sm input-primary w-full max-w-xs bg-inherit text-white"
                      />
                    </div>
                    <div className="pt-2">
                      <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </div>

                    <div className="flex justify-center my-5  ">
                      <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md justify-center w-full text-2xl pb-1 ">
                        Update Password
                      </button>
                    </div>
                    <div className="text-lg pt-3 text-center"></div>
                  </div>
                </form>
              </div>
              {/* <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div> */}
            </div>
          </dialog>
        )}

        {/* *************************************************************** */}
      </div>
    </div>
  );
};

export default LoginPage;
