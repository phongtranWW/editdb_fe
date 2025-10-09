import { Form, Input, Button, Typography, Image, Flex, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import type { RegisterDto } from "../api/auth/dtos/register-dto";
import { useEffect } from "react";

const { Text } = Typography;

export default function RegisterPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigator = useNavigate();
  const { register, error, setError, success, setSuccess } = useAuth();

  useEffect(() => {
    if (error) {
      messageApi.error(error);
      setError(undefined);
    }
  }, [error, setError, messageApi]);

  useEffect(() => {
    if (success) {
      messageApi.success(success);
      setSuccess(undefined);
    }
  }, [success, setSuccess, messageApi]);

  return (
    <Flex vertical align="center" justify="center" className="!p-2" gap={16}>
      {contextHolder}
      <Flex vertical align="center" justify="center" gap={8}>
        {/* Header */}
        <Image
          className="cursor-pointer"
          src="/logo.png"
          alt="Logo"
          width={32}
          preview={false}
          onClick={() => navigator("/")}
        />
        <Text className="!text-2xl !font-semibold !text-orange-400">
          Register your account
        </Text>
      </Flex>
      <Form
        name="register"
        layout="vertical"
        autoComplete="off"
        size="large"
        className="w-full"
        onFinish={(values) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { confirm, ...payload } = values;
          register(payload as RegisterDto);
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Email is not valid!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="!text-gray-400" />}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="!text-gray-400" />}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                const minLength = 8;
                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);
                const hasSymbol = /[^A-Za-z0-9]/.test(value);

                if (value.length < minLength) {
                  return Promise.reject(
                    new Error("Password must be at least 8 characters long")
                  );
                }
                if (!hasUpperCase) {
                  return Promise.reject(
                    new Error(
                      "Password must contain at least 1 uppercase letter"
                    )
                  );
                }
                if (!hasLowerCase) {
                  return Promise.reject(
                    new Error(
                      "Password must contain at least 1 lowercase letter"
                    )
                  );
                }
                if (!hasNumber) {
                  return Promise.reject(
                    new Error("Password must contain at least 1 number")
                  );
                }
                if (!hasSymbol) {
                  return Promise.reject(
                    new Error(
                      "Password must contain at least 1 special character"
                    )
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="!text-gray-400" />}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
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
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="!text-gray-400" />}
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            size="large"
            style={{ height: "44px" }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <Text>
        Already have an account?{" "}
        <Text
          className="!font-semibold !text-orange-400 !cursor-pointer"
          onClick={() => navigator("/login")}
        >
          Login now
        </Text>
      </Text>
    </Flex>
  );
}
