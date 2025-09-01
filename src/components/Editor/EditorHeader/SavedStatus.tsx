import { Tag } from "antd";
import { useAction } from "../../../hooks/useAction";
import { useEffect, useState } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

export function SavedStatus() {
  const { saved, loading } = useAction();
  const [status, setStatus] = useState<{
    color: string;
    content: string;
    icon?: React.ReactNode;
  }>({
    color: "red",
    content: "Unsaved",
    icon: <CloseOutlined />,
  });

  useEffect(() => {
    if (loading) {
      setStatus({
        color: "blue",
        content: "Saving...",
        icon: <LoadingOutlined spin />,
      });
    } else {
      setStatus({
        color: saved ? "green" : "red",
        content: saved ? "Saved" : "Unsaved",
        icon: saved ? <CheckOutlined /> : <CloseOutlined />,
      });
    }
  }, [saved, loading]);

  return (
    <Tag color={status.color} icon={status.icon}>
      {status.content}
    </Tag>
  );
}
