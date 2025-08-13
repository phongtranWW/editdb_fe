import { DeleteOutlined } from "@ant-design/icons";
import { Button, Collapse, Popconfirm, Typography } from "antd";
const { Text } = Typography;

interface CollapsableTabItemProps {
  label: string;
  deleteItem: () => void;
  children: React.ReactNode;
}

export default function CollapsableTabItem({
  label,
  deleteItem,
  children,
}: CollapsableTabItemProps) {
  return (
    <Collapse
      bordered={false}
      className="!rounded-none !shadow-none !border-b !border-gray-200"
      items={[
        {
          key: label,
          label: <Text className="!text-base !font-bold">{label}</Text>,
          children,
          extra: (
            <Popconfirm
              title="Are you sure?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ danger: true }}
              onConfirm={(e) => {
                e?.stopPropagation();
              }}
              onCancel={(e) => e?.stopPropagation()}
            >
              <Button
                size="small"
                color="danger"
                icon={<DeleteOutlined />}
                variant="text"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem();
                }}
              />
            </Popconfirm>
          ),
        },
      ]}
    />
  );
}
