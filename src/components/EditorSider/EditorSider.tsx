import { Layout, Tabs } from "antd";
import TablesTabContent from "./TablesTab/TablesTabContent";
import RelationshipsTabContent from "./RelationshipsTab/RelationshipsTabContent";
const { Sider } = Layout;

export default function EditorSider() {
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
    <Sider
      className="overflow-y-auto border-r-1 border-gray-200"
      width="20%"
      trigger={null}
    >
      <Tabs centered items={items} />
    </Sider>
  );
}
