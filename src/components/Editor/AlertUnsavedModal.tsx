import { Button, Modal, Typography } from "antd";

const { Text } = Typography;

interface AlertUnsavedModalProps {
  show: boolean;
  onCancel: () => void;
  onSave: () => void;
  onDonotSave: () => void;
}

export function AlertUnsavedModal({
  show,
  onCancel,
  onSave,
  onDonotSave,
}: AlertUnsavedModalProps) {
  return (
    <Modal
      title="Unsaved changes"
      open={show}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Return
        </Button>,
        <Button
          key="donotsave"
          color="danger"
          variant="outlined"
          onClick={onDonotSave}
        >
          Don't Save
        </Button>,
        <Button key="save" color="primary" variant="solid" onClick={onSave}>
          Save
        </Button>,
      ]}
    >
      <Text>Are you sure you want to leave without saving?</Text>
    </Modal>
  );
}
