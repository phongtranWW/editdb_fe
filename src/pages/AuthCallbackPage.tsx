import { useEffect } from "react";
import { Spin, Typography } from "antd";
import { useNavigate, useSearchParams } from "react-router";

const { Title } = Typography;

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("access_token", token);
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Spin size="large" />
      <Title level={4} className="mt-4">
        Processing login...
      </Title>
    </div>
  );
}
