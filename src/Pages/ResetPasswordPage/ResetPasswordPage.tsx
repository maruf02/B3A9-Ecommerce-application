import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../Redux/features/auth/authApi";
import { Button, Form, Input } from "antd";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  const token = params.get("token");

  if (!userId || !token) {
    Swal.fire({
      title: "Error!",
      text: "Invalid or missing reset link parameters.",
      icon: "error",
    });
    navigate("/");
    return null;
  }

  const handlePasswordReset = async (values: { password: string }) => {
    const { password } = values;

    console.log(userId, token, password);
    try {
      await resetPassword({
        userId,
        token,
        password,
      }).unwrap();

      Swal.fire({
        title: "Success!",
        text: "Your password has been reset.",
        icon: "success",
      });

      navigate("/login");
    } catch (err: any) {
      Swal.fire({
        title: "Error!",
        text: err?.data?.message || "An error occurred, please try again.",
        icon: "error",
      });
    }
  };

  const onFinishFailed = () => {
    Swal.fire({
      title: "Error!",
      text: "Please fill the form with correct information.",
      icon: "error",
    });
  };

  return (
    <div className="bg-white w-full h-full min-h-screen flex flex-col justify-center align-middle">
      <div className="w-full flex flex-row justify-center">
        <h2 className="text-lg font-semibold">Reset Your Password</h2>
      </div>
      <div className="w-full flex flex-row justify-center ">
        <div className="card w-full max-w-lg shadow-xl p-10 bg-blue-400">
          <Form
            form={form}
            name="reset-password"
            onFinish={handlePasswordReset}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
          >
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password className="w-full" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password className="w-full" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-black text-white"
                loading={isLoading}
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
