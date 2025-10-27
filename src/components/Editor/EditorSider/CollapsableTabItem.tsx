import { DeleteOutlined } from "@ant-design/icons";
import { Button, Collapse, Popconfirm } from "antd";
import DoubleClickInput from "../../UI/DoubleClickInput";

interface CollapsableTabItemProps {
  label: string;
  changeLabel: (label: string) => void;
  deleteItem: () => void;
  children: React.ReactNode;
}

export default function CollapsableTabItem({
  label,
  changeLabel,
  deleteItem,
  children,
}: CollapsableTabItemProps) {
  return (
    <Collapse
      collapsible="icon"
      bordered={false}
      className="!rounded-none !shadow-none !border-b !border-b-gray-200 !border-l-4 !border-l-blue-500 !w-full"
      items={[
        {
          key: label,
          label: (
            <DoubleClickInput
              initialValue={label}
              placeholder="Table Name"
              classes={{
                root: "text-base font-bold max-w-full",
                title: "max-w-full",
              }}
              onFinish={changeLabel}
            />
          ),
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
