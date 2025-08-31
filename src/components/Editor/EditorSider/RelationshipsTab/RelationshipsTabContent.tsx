import EditableInput from "../../../ui/EditableInput";
import CollapsableTabItem from "../CollapsableTabItem";
import TabContainer from "../TabContainer";
import { Flex, Space, Tag, Typography } from "antd";
import RelationshipDetail from "./RelationshipDetail";
import { useDiagram } from "../../../../hooks/useDiagram";
import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../models/diagram-relationship";

const { Text } = Typography;

export default function RelationshipsTabContent() {
  const { state, dispatch } = useDiagram();

  return (
    <TabContainer
      dataSource={state.relationships}
      renderItem={(relationship: DiagramRelationship) => (
        <CollapsableTabItem
          label={relationship.name}
          key={relationship.id}
          deleteItem={() =>
            dispatch({
              type: "DELETE_RELATIONSHIP",
              payload: relationship.id,
            })
          }
        >
          <RelationshipDetail relationship={relationship}>
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
                    if (!name) {
                      dispatch({
                        type: "SET_ERROR",
                        payload: "Relationship name is cannot be empty",
                      });
                      return;
                    }
                    dispatch({
                      type: "UPDATE_RELATIONSHIP",
                      payload: {
                        id: relationship.id,
                        partialRelationship: { name },
                      },
                    });
                  }}
                />
              </Flex>
              <Space size="small" className="w-full" direction="vertical">
                <Flex align="center" className="w-full" justify="space-between">
                  <Text className="!text-sm !font-semibold">From:</Text>
                  <Text className="!text-sm">
                    {
                      state.tables.find(
                        (table) => table.id === relationship.fromTable
                      )?.name
                    }
                  </Text>
                </Flex>
                <Flex align="center" className="w-full" justify="space-between">
                  <Text className="!text-sm !font-semibold">To:</Text>
                  <Text className="!text-sm">
                    {
                      state.tables.find(
                        (table) => table.id === relationship.toTable
                      )?.name
                    }
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
        dispatch({
          type: "ADD_RELATIONSHIP",
          payload: {
            id: nanoid(6),
            name: `fk_relationship_${state.relationships.length + 1}`,
            type: "ONE-TO-ONE",
          },
        });
      }}
    />
  );
}
