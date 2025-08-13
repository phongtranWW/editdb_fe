import { useDiagramDetail } from "../../../../hooks/useDiagramDetail";
import EditableInput from "../../../ui/EditableInput";
import CollapsableTabItem from "../CollapsableTabItem";
import TabContainer from "../TabContainer";
import { Flex, Space, Tag, Typography } from "antd";
import RelationshipDetail from "./RelationshipDetail";

const { Text } = Typography;

export default function RelationshipsTabContent() {
  const {
    relationships,
    addRelationship,
    getTableName,
    deleteRelationship,
    updateRelationship,
  } = useDiagramDetail();

  return (
    <TabContainer
      dataSource={relationships}
      renderItem={(relationship) => (
        <CollapsableTabItem
          label={relationship.name}
          key={relationship.id}
          deleteItem={() => deleteRelationship(relationship.id)}
        >
          <RelationshipDetail {...relationship}>
            <Space size="small" className="w-full" direction="vertical">
              <Flex
                align="center"
                className="w-full"
                justify="space-between"
                gap={16}
              >
                <Text className="!text-xs">Name: </Text>
                <EditableInput
                  className="!flex-1"
                  initialValue={relationship.name}
                  placeholder="Relationship name"
                  onFinish={(name) => {
                    updateRelationship(relationship.id, { name });
                  }}
                />
              </Flex>
              <Space size="small" className="w-full" direction="vertical">
                <Flex align="center" className="w-full" justify="space-between">
                  <Text className="!text-sm !font-semibold">From:</Text>
                  <Text className="!text-sm">
                    {getTableName(relationship.fromTable)}
                  </Text>
                </Flex>
                <Flex align="center" className="w-full" justify="space-between">
                  <Text className="!text-sm !font-semibold">To:</Text>
                  <Text className="!text-sm">
                    {getTableName(relationship.toTable)}
                  </Text>
                </Flex>
                <Flex align="center" className="w-full" justify="space-between">
                  <Text className="!text-sm !font-semibold">Type:</Text>
                  <Tag color="orange" className="!m-0">
                    {relationship.type}
                  </Tag>
                </Flex>
              </Space>
            </Space>
          </RelationshipDetail>
        </CollapsableTabItem>
      )}
      addItem={() => {
        addRelationship(`relationship_${relationships.length + 1}`);
      }}
    />
  );
}
