import { Form, Input, Button, Divider, Typography, Image, Flex } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import GoogleLoginButton from "../components/Form/Login/GoogleLoginButton";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useCallback } from "react";
import type { LoginDto } from "../api/auth/dtos/login-dto";

const { Text } = Typography;

export default function LoginPage() {
  const navigator = useNavigate();

  const { login } = useAuth();

  const handleLocalLogin = useCallback(
    async (values: LoginDto) => {
      const success = await login(values);
      if (success) {
        navigator("/");
      }
    },
    [login, navigator]
  );

  return (
    <Flex vertical align="center" justify="center" className="!p-2" gap={16}>
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
          Welcome to EditDB
        </Text>
      </Flex>
      <GoogleLoginButton />
      <Divider size="small">or</Divider>
      <Form
        name="login"
        layout="vertical"
        autoComplete="off"
        size="large"
        className="w-full"
        onFinish={handleLocalLogin}
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
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="!text-gray-400" />}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            size="large"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      <Text>
        Don't have an account?{" "}
        <Text
          className="!font-semibold !text-orange-400 !cursor-pointer"
          onClick={() => navigator("/register")}
        >
          Register now
        </Text>
      </Text>
    </Flex>
  );
}
