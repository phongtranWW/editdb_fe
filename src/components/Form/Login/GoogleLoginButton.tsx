import { GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useCallback } from "react";

export default function GoogleLoginButton() {
  const handleClick = useCallback(() => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  }, []);

  return (
    <Button
      size="large"
      icon={<GoogleOutlined />}
      className="w-full"
      onClick={handleClick}
    >
      Login with Google
    </Button>
  );
}
