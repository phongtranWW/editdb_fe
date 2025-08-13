import {
  Form,
  Input,
  Button,
  Divider,
  Checkbox,
  Typography,
  Space,
  Image,
} from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import FormLayout from "../components/Form/FormLayout";

const { Title, Text, Link } = Typography;

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <FormLayout>
      <div className="text-center mb-8">
        {/* Header */}
        <Image src="/logo.png" alt="Logo" width={64} />
        <Title level={2} className="mb-2">
          Welcome to EDITDB
        </Title>
      </div>

      <Space direction="vertical" size="small" className="w-full">
        {/* Google Login Button */}
        <Button
          size="large"
          icon={<GoogleOutlined />}
          className="w-full h-[44px]"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>

        {/* Divider */}
        <Divider>or</Divider>

        {/* Login Form */}
        <Form name="login" layout="vertical" autoComplete="off" size="large">
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
              prefix={<UserOutlined className="text-gray-400" />}
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
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </Form.Item>

          {/* Remember me and Forgot password */}
          <Form.Item>
            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link>Forgot password?</Link>
            </div>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              style={{ height: "44px" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <Text type="secondary">
            Don't have an account? <Link strong>Register now</Link>
          </Text>
        </div>
      </Space>
    </FormLayout>
  );
}
