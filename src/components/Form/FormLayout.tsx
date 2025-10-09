import { Card, Flex } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useAppMessage } from "../../context/AppMessageContext/hooks";

export default function FormLayout() {
  const { messageApi } = useAppMessage();
  const { setError, setSuccess, error, success } = useAuth();

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
    <Flex className="!h-screen !w-full" justify="center" align="center">
      <Card className="lg:w-1/3 md:w-1/2 w-full !m-4 shadow-lg">
        <Outlet />
      </Card>
    </Flex>
  );
}
