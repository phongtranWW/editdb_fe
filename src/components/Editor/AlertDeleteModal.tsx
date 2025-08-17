import { Button, Modal, Typography } from "antd";

const { Text } = Typography;

interface AlertDeleteModalProps {
  show: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export function AlertDeleteModal({
  show,
  onCancel,
  onDelete,
}: AlertDeleteModalProps) {
  return (
    <Modal
      title="Delete"
      open={show}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Return
        </Button>,
        <Button
          key="delete"
          color="danger"
          variant="outlined"
          onClick={onDelete}
        >
          Delete
        </Button>,
      ]}
    >
      <Text>Are you sure you want to delete this diagram?</Text>
    </Modal>
  );
}
