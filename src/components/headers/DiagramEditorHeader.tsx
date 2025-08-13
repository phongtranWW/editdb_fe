import {
  CheckSquareOutlined,
  CloseSquareOutlined,
  DownOutlined,
  EditFilled,
  ShareAltOutlined,
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

const { Header } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

// Tách ra ngoài để tránh re-creation
const fileMenuItems = [
  { label: "Save", key: "save" },
  { label: "Delete Diagram", key: "delete" },
  { label: "Exit", key: "exit" },
];

export default function DiagramEditorHeader() {
  const {
    showMenu,
    showMiniMap,
    showControls,
    toggleShowMenu,
    toggleShowMiniMap,
    toggleShowControls,
  } = useView();
  const { name, description, updateInfo } = useDiagramDetail();

  const [showInfo, setShowInfo] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempDesc, setTempDesc] = useState(description);

  const viewMenuItems = [
    {
      label: "Menu",
      key: "menu",
      icon: showMenu ? <CheckSquareOutlined /> : <CloseSquareOutlined />,
    },
    {
      label: "Mini Map",
      key: "minimap",
      icon: showMiniMap ? <CheckSquareOutlined /> : <CloseSquareOutlined />,
    },
    {
      label: "Controls",
      key: "controls",
      icon: showControls ? <CheckSquareOutlined /> : <CloseSquareOutlined />,
    },
  ];

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
        <Dropdown menu={{ items: fileMenuItems }} placement="bottomLeft">
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

        <Dropdown menu={{ items: fileMenuItems }} placement="bottomLeft">
          <Button type="text">
            <Space>
              Help <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <Tag color="green">Saved at: 5:00 PM</Tag>
        <Button icon={<ShareAltOutlined />}>Share</Button>
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
    </Header>
  );
}
