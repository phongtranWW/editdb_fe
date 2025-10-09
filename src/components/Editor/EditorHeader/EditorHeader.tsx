import { Button, Image, Layout } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import { SavedStatus } from "./SavedStatus";
import { useNavigate } from "react-router";
import DoubleClickInput from "../../UI/DoubleClickInput";
import FileDropdown from "./FileDropdown";
import ViewDropdown from "./ViewDropdown";
import EditDropdown from "./EditDropdown";
import { useDiagram } from "../../../context/DiagramContext/hooks";
import HelpDropdown from "./HelpDropdown";

const { Header } = Layout;

export default function EditorHeader() {
  const navigator = useNavigate();
  const { state, dispatch } = useDiagram();

  return (
    <Header className="flex justify-between items-center py-0 px-4 shadow-md z-10">
      {/* Logo + Diagram Name + Menus */}
      <div className="flex items-center space-x-2">
        <Image
          className="cursor-pointer"
          src="/logo.png"
          width={48}
          preview={false}
          onClick={() => navigator("/")}
        />
        <div className="flex flex-col">
          <DoubleClickInput
            initialValue={state.data.name}
            onFinish={(name) => {
              dispatch({ type: "SET_NAME", payload: name });
            }}
            placeholder="Diagram Name"
            classes={{
              root: "flex-1 text-lg font-semibold max-w-60 ml-2",
            }}
          />
          <div className="flex">
            <FileDropdown />
            <ViewDropdown />
            <EditDropdown />
            <HelpDropdown />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center !space-x-4">
        <SavedStatus />
        <Button icon={<ShareAltOutlined />}>Share</Button>
        {/* <EditableSelection
          initialValue={DATABASE[type]?.name}
          options={Object.values(Database).map((type) => ({
            label: DATABASE[type].name,
            value: type,
          }))}
          finishSelect={(value) => {
            dispatch({ type: "SET_TYPE", payload: value });
          }}
        /> */}
      </div>
    </Header>
  );
}
