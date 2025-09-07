import { Button, Image, Layout, Typography } from "antd";
import EditableSelection from "../../UI/EditableSelection";
import { ShareAltOutlined } from "@ant-design/icons";
import { useDiagram } from "../../../hooks/useDiagram";
import FileDropDown from "./FileDropDown";
import ViewDropDown from "./ViewDropDown";
import { DATABASE } from "../../../data/database";
import { Database } from "../../../data/constants";
import { SavedStatus } from "./SavedStatus";
import { useNavigate } from "react-router";

const { Header } = Layout;
const { Text } = Typography;

export default function EditorHeader() {
  const navigator = useNavigate();
  const {
    state: { type, name },
    dispatch,
  } = useDiagram();

  return (
    <Header className="flex justify-between items-center py-0 px-4 shadow-md z-10">
      {/* Logo + Title */}
      <div className="flex items-center space-x-4">
        <Image
          className="cursor-pointer"
          src="/logo.png"
          width={32}
          preview={false}
          onClick={() => navigator("/")}
        />
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
        <SavedStatus />
        <Button icon={<ShareAltOutlined />}>Share</Button>
        <EditableSelection
          initialValue={DATABASE[type]?.name}
          options={Object.values(Database).map((type) => ({
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
