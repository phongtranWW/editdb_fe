import { Flex, Typography } from "antd";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { Issue } from "../../../models/issue";
import { IssueType } from "../../../data/constants";

const { Text } = Typography;

interface IssueItemProps {
  issue: Issue;
}

export function IssueItem({ issue }: IssueItemProps) {
  let icon;
  switch (issue.type) {
    case IssueType.ERROR:
      icon = <CloseCircleOutlined className="!text-red-500" />;
      break;
    case IssueType.WARNING:
      icon = <ExclamationCircleOutlined className="!text-yellow-500" />;
      break;
    default:
      icon = <InfoCircleOutlined className="!text-blue-500" />;
  }
  return (
    <Flex align="center" className="w-full space-x-2">
      {icon}
      <Text className="!truncate !text-xs">{issue.message}</Text>
    </Flex>
  );
}
