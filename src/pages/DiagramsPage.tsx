import { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
  Alert,
  Spin,
  Empty,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useUserDiagrams } from "../hooks/useDiagrams";
import type { SummaryDiagram } from "../models/summary-diagram";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function DiagramsPage() {
  const {
    diagrams,
    isLoading,
    error,
    fetchDiagrams,
    deleteDiagram,
    createDiagram,
  } = useUserDiagrams();
  const navigator = useNavigate();

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [creating, setCreating] = useState(false);

  const handleCreateDiagram = async (values: {
    name: string;
    description?: string;
  }) => {
    try {
      setCreating(true);
      await createDiagram(values);
      setIsCreateModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to create diagram:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteDiagram = async (id: string) => {
    await deleteDiagram(id);
  };

  const renderDiagramCard = (diagram: SummaryDiagram) => (
    <Card
      className="h-full hover:shadow-lg transition-shadow duration-200"
      actions={[
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => {
            navigator(`/diagrams/${diagram.id}`);
          }}
        >
          Edit
        </Button>,
        <Popconfirm
          title="Delete Diagram"
          description="Are you sure you want to delete this diagram?"
          onConfirm={() => handleDeleteDiagram(diagram.id)}
          okText="Yes"
          cancelText="No"
          icon={<ExclamationCircleOutlined style={{ color: "#ff6b35" }} />}
        >
          <Button type="text" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>,
      ]}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#fff5f0" }}
          >
            <FileTextOutlined
              className="text-xl"
              style={{ color: "#ff6b35" }}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <Title level={4} className="mb-2 truncate">
            {diagram.name}
          </Title>
          <Text type="secondary" className="text-sm">
            {diagram.description || "No description provided"}
          </Text>
        </div>
      </div>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <Spin size="large" />
            <div className="mt-4 text-gray-500">Loading diagrams...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      {/* Banner Section */}
      <div className="mb-8">
        <Card
          className="mb-6"
          style={{
            backgroundColor: "#2c3e50",
            border: "none",
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <Title level={2} className="mb-2" style={{ color: "#ffffff" }}>
                My Diagrams
              </Title>
              <Text
                className="text-base"
                style={{ color: "#ffffff", opacity: 0.8 }}
              >
                Create and manage your diagrams
              </Text>
              <div className="mt-4">
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "#ff6b35",
                    color: "#ffffff",
                  }}
                >
                  Total Diagrams: {diagrams.length}
                </div>
              </div>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setIsCreateModalVisible(true)}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#ffffff",
                color: "#2c3e50",
              }}
              className="hover:opacity-90"
            >
              New Diagram
            </Button>
          </div>
        </Card>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            className="mb-4"
            action={
              <Button size="small" onClick={fetchDiagrams}>
                Retry
              </Button>
            }
          />
        )}
      </div>

      {/* Diagrams Grid */}
      {diagrams.length === 0 ? (
        <div className="flex items-center justify-center min-h-96">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className="mt-4">
                <Title level={4} type="secondary" className="mb-2">
                  No diagrams found
                </Title>
                <Text type="secondary" className="mb-4 block">
                  Start by creating your first diagram
                </Text>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsCreateModalVisible(true)}
                >
                  Create Your First Diagram
                </Button>
              </div>
            }
          />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {diagrams.map((diagram) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={diagram.id}>
              {renderDiagramCard(diagram)}
            </Col>
          ))}
        </Row>
      )}

      {/* Create Diagram Modal */}
      <Modal
        title={
          <Space>
            <PlusOutlined />
            Create New Diagram
          </Space>
        }
        open={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateDiagram}
          className="mt-4"
        >
          <Form.Item
            label="Diagram Name"
            name="name"
            rules={[
              { required: true, message: "Please enter diagram name" },
              { min: 2, message: "Name must be at least 2 characters" },
              { max: 50, message: "Name must not exceed 50 characters" },
            ]}
          >
            <Input placeholder="Enter diagram name" size="large" />
          </Form.Item>

          <Form.Item
            label="Description (Optional)"
            name="description"
            rules={[
              {
                max: 200,
                message: "Description must not exceed 200 characters",
              },
            ]}
          >
            <TextArea
              placeholder="Enter diagram description"
              rows={3}
              showCount
              maxLength={200}
            />
          </Form.Item>

          <Form.Item className="mb-0 mt-6">
            <Space className="w-full justify-end">
              <Button
                onClick={() => {
                  setIsCreateModalVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={creating}
                icon={<PlusOutlined />}
              >
                Create Diagram
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
