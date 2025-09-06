import { Card, Flex } from "antd";
import { Outlet } from "react-router";

export default function FormLayout() {
  return (
    <Flex className="!h-screen !w-full" justify="center" align="center">
      <Card className="lg:w-1/3 md:w-1/2 w-full !m-4 shadow-lg">
        <Outlet />
      </Card>
    </Flex>
  );
}
