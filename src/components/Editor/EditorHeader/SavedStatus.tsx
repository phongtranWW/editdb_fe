import { Tag } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useSave } from "../../../context/SaveContext/hooks";

export function SavedStatus() {
  const { saving } = useSave();

  switch (saving) {
    case "idle":
      return (
        <Tag color="green" icon={<CheckOutlined />}>
          Saved
        </Tag>
      );
    case "dirty":
      return (
        <Tag color="red" icon={<CloseOutlined />}>
          Unsaved
        </Tag>
      );
    default:
      return (
        <Tag color="blue" icon={<LoadingOutlined spin />}>
          Saving
        </Tag>
      );
  }
}
