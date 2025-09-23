import { Flex } from "antd";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { Issue } from "../../../models/issue";
import { IssueType } from "../../../data/constants";

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
      <p className="line-clamp-2 !text-xs">{issue.message}</p>
    </Flex>
  );
}
