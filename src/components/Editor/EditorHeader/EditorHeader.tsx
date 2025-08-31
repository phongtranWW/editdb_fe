import { Button, Image, Layout, Tag, Typography } from "antd";
import EditableSelection from "../../ui/EditableSelection";
import { ShareAltOutlined } from "@ant-design/icons";
import { useDiagram } from "../../../hooks/useDiagram";
import FileDropDown from "./FileDropDown";
import ViewDropDown from "./ViewDropDown";
import { DATABASE } from "../../../data/database";
import { DatabaseType } from "../../../data/constants";

const { Header } = Layout;
const { Text } = Typography;

export default function EditorHeader() {
  const {
    state: { type, name },
    dispatch,
  } = useDiagram();

  return (
    <Header className="flex justify-between items-center py-0 px-4 shadow-md z-10">
      {/* Logo + Title */}
      <div className="flex items-center space-x-4">
        <Image src="/logo.png" width={32} preview={false} />
        <Text
          copyable={false}
          className="font-medium !text-xl !m-0"
          editable={{
            tooltip: "Click to edit diagram name",
            onChange: (value) => dispatch({ type: "SET_NAME", payload: value }),
          }}
        >
          {name}
        </Text>
      </div>

      {/* Menus */}
      <div className="flex items-center space-x-4">
        <FileDropDown />
        <ViewDropDown />
      </div>

      {/* Actions */}
      <div className="flex items-center !space-x-4">
        <Tag color="green">Saved</Tag>
        <Button icon={<ShareAltOutlined />}>Share</Button>
        <EditableSelection
          initialValue={DATABASE[type]?.name}
          options={Object.values(DatabaseType).map((type) => ({
            label: DATABASE[type].name,
            value: type,
          }))}
          finishSelect={(value) => {
            dispatch({ type: "SET_TYPE", payload: value });
          }}
        />
      </div>
    </Header>
  );
}
