import { Badge, Flex, Layout, List, Typography } from "antd";
import { IssueItem } from "./IssueItem";
import { useView } from "../../../context/ViewContext/hooks";
import { useDiagram } from "../../../context/DiagramContext/hooks";

const { Sider } = Layout;
const { Text } = Typography;

export default function IssuesPanel() {
  const { state: viewState } = useView();
  const { state: diagramState } = useDiagram();

  return (
    viewState.showIssues && (
      <Sider
        className="overflow-y-auto border-l border-gray-200 bg-white"
        width="18%"
        trigger={null}
      >
        <Flex vertical className="h-full">
          {/* Header */}
          <Flex
            align="center"
            justify="space-between"
            className="!p-2 border-b border-gray-200"
          >
            <Text className="text-md font-semibold">
              {diagramState.issues.length > 0 ? "Issues" : "No issues found"}
            </Text>
            <Badge count={diagramState.issues.length} size="small" />
          </Flex>

          {/* List */}
          <List
            className="flex-1 overflow-y-auto"
            dataSource={diagramState.issues}
            renderItem={(issue) => (
              <List.Item className="!px-2">
                <IssueItem issue={issue} />
              </List.Item>
            )}
          />
        </Flex>
      </Sider>
    )
  );
}
