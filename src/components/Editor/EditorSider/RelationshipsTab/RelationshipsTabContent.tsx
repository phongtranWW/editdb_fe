import CollapsableTabItem from "../CollapsableTabItem";
import TabContainer from "../TabContainer";
import { nanoid } from "nanoid";
import type { DiagramRelationship } from "../../../../models/diagram-relationship";
import { Relationship } from "../../../../data/constants";
import RelationshipContent from "./RelationshipContent";
import { useDiagram } from "../../../../context/DiagramContext/hooks";

export default function RelationshipsTabContent() {
  const { state, dispatch } = useDiagram();

  return (
    <TabContainer
      dataSource={state.relationships}
      renderItem={(relationship: DiagramRelationship) => (
        <CollapsableTabItem
          label={relationship.name}
          key={relationship.id}
          changeLabel={(name) => {
            dispatch({
              type: "UPDATE_RELATIONSHIP",
              payload: {
                id: relationship.id,
                partialRelationship: { name },
              },
            });
          }}
          deleteItem={() =>
            dispatch({
              type: "DELETE_RELATIONSHIP",
              payload: relationship.id,
            })
          }
        >
          <RelationshipContent relationship={relationship} />
        </CollapsableTabItem>
      )}
      addItem={() => {
        dispatch({
          type: "ADD_RELATIONSHIP",
          payload: {
            id: nanoid(6),
            name: `fk_relationship_${state.relationships.length + 1}`,
            type: Relationship.ONE_TO_ONE,
          },
        });
      }}
    />
  );
}
