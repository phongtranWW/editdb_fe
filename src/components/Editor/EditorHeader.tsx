import {
  BorderOutlined,
  CheckSquareOutlined,
  DownOutlined,
  EditFilled,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Image,
  Layout,
  Modal,
  Space,
  Tag,
  Tooltip,
  Typography,
  Input,
} from "antd";
import { useView } from "../../hooks/useView";
import { useDiagramDetail } from "../../hooks/useDiagramDetail";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AlertUnsavedModal } from "./AlertUnsavedModal";
import { AlertDeleteModal } from "./AlertDeleteModal";
import EditableSelection from "../ui/EditableSelection";
import { CheckOutlined, ShareAltOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

const fileMenuItems = [
  { label: "Save", key: "save" },
  { label: "Delete", key: "delete" },
  { label: "Exit", key: "exit" },
];

const exportMenuItems = [
  { label: "Postgres", key: "postgres" },
  { label: "MySQL", key: "mysql" },
];

export default function EditorHeader() {
  const navigator = useNavigate();

  // Hooks
  const {
    showMenu,
    showMiniMap,
    showControls,
    toggleShowMenu,
    toggleShowMiniMap,
    toggleShowControls,
  } = useView();
  const {
    name,
    description,
    updateInfo,
    isSaved,
    saveDiagram,
    deleteDiagram,
    visibility,
    updateVisibility,
  } = useDiagramDetail();

  // States
  const [showInfo, setShowInfo] = useState(false);
  const [showAlertUnsaved, setShowAlertUnsaved] = useState(false);
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempDesc, setTempDesc] = useState(description);

  const viewMenuItems = [
    {
      label: "Menu",
      key: "menu",
      icon: showMenu ? <CheckSquareOutlined /> : <BorderOutlined />,
    },
    {
      label: "Mini Map",
      key: "minimap",
      icon: showMiniMap ? <CheckSquareOutlined /> : <BorderOutlined />,
    },
    {
      label: "Controls",
      key: "controls",
      icon: showControls ? <CheckSquareOutlined /> : <BorderOutlined />,
    },
  ];

  const handleFileMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "save":
        saveDiagram();
        break;
      case "delete":
        setShowAlertDelete(true);
        break;
      case "exit":
        if (!isSaved) {
          setShowAlertUnsaved(true);
        } else {
          navigator("/");
        }
        break;
    }
  };

  const handleViewMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "menu":
        toggleShowMenu();
        break;
      case "minimap":
        toggleShowMiniMap();
        break;
      case "controls":
        toggleShowControls();
        break;
    }
  };

  const handleOk = () => {
    updateInfo(tempName, tempDesc);
    setShowInfo(false);
  };

  return (
    <Header className="flex justify-between items-center py-0 px-4 shadow-md z-10">
      {/* Logo + Title */}
      <div className="flex items-center space-x-4">
        <Image src="/logo.png" width={32} preview={false} />
        <Space size="small">
          <Text copyable={false} className="font-medium !text-xl !m-0">
            {name}
          </Text>
          <Tooltip title="Edit Diagram Info">
            <Button
              type="text"
              icon={<EditFilled />}
              onClick={() => {
                setTempName(name);
                setTempDesc(description);
                setShowInfo(true);
              }}
            />
          </Tooltip>
        </Space>
      </div>

      {/* Menus */}
      <div className="flex items-center space-x-4">
        <Dropdown
          menu={{ items: fileMenuItems, onClick: handleFileMenuClick }}
          placement="bottomLeft"
        >
          <Button type="text">
            <Space>
              File <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Dropdown
          menu={{ items: viewMenuItems, onClick: handleViewMenuClick }}
          placement="bottomLeft"
          trigger={["click"]}
        >
          <Button type="text">
            <Space>
              View <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Dropdown menu={{ items: exportMenuItems }} placement="bottomLeft">
          <Button type="text">
            <Space>
              Export <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {isSaved ? (
          <Tag color="green">Saved</Tag>
        ) : (
          <Tag color="red">Unsaved</Tag>
        )}
        <EditableSelection
          initialValue={visibility || "PUBLIC"}
          options={[
            { label: "PUBLIC", value: "PUBLIC" },
            { label: "PRIVATE", value: "PRIVATE" },
          ]}
          finishSelect={(visibility) => updateVisibility(visibility)}
          className="w-24"
          menuItemSelectedIcon={<CheckOutlined />}
          suffixIcon={<ShareAltOutlined />}
        />
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Diagram Info"
        open={showInfo}
        onOk={handleOk}
        onCancel={() => setShowInfo(false)}
        okText="Save"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Diagram Name"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
          <TextArea
            placeholder="Diagram Description"
            rows={4}
            value={tempDesc}
            onChange={(e) => setTempDesc(e.target.value)}
          />
        </Space>
      </Modal>

      {/* Alert Unsaved Modal */}
      <AlertUnsavedModal
        show={showAlertUnsaved}
        onCancel={() => setShowAlertUnsaved(false)}
        onSave={() => {
          saveDiagram();
          setShowAlertUnsaved(false);
          navigator("/diagrams");
        }}
        onDonotSave={() => {
          setShowAlertUnsaved(false);
          navigator("/diagrams");
        }}
      />

      {/* Alert Delete Modal */}
      <AlertDeleteModal
        show={showAlertDelete}
        onCancel={() => setShowAlertDelete(false)}
        onDelete={() => {
          deleteDiagram();
          setShowAlertDelete(false);
          navigator("/diagrams");
        }}
      />
    </Header>
  );
}
