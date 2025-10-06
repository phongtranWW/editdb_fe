import { Layout, Tabs } from "antd";
import TablesTabContent from "./TablesTab/TablesTabContent";
import RelationshipsTabContent from "./RelationshipsTab/RelationshipsTabContent";
import { useView } from "../../../context/ViewContext/hooks";
const { Sider } = Layout;

export default function EditorSider() {
  const { state } = useView();

  const items = [
    {
      label: "Tables",
      children: <TablesTabContent />,
      key: "1",
    },
    {
      label: "Relationships",
      children: <RelationshipsTabContent />,
      key: "2",
    },
  ];

  return (
    state.showSider && (
      <Sider
        className="overflow-y-auto border-r-1 border-gray-200"
        width="20%"
        trigger={null}
      >
        <Tabs centered items={items} />
      </Sider>
    )
  );
}
