import { useState } from "react";
import type { CreateDiagramDto } from "../../../api/diagrams/dtos/create-diagram-dto";
import { Database } from "../../../data/constants";
import { Input, Modal, Typography, Form, Card, Avatar } from "antd";
import {
  LoadingOutlined,
  DatabaseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { DATABASE } from "../../../data/database";

const { Text, Title } = Typography;

interface CreateDiagramModalProps {
  loading: boolean;
  show: boolean;
  onClose: () => void;
  onOk: (dto: CreateDiagramDto) => void;
}

export default function CreateDiagramModal({
  loading,
  show,
  onClose,
  onOk,
}: CreateDiagramModalProps) {
  const [diagramDto, setDiagramDto] = useState<CreateDiagramDto>({
    name: "New Schema",
    type: Database.MYSQL,
    tables: [],
    relationships: [],
  });

  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(() => {
      onOk(diagramDto);
      // Reset form after successful creation
      setDiagramDto({
        name: "New Schema",
        type: Database.MYSQL,
        tables: [],
        relationships: [],
      });
      form.resetFields();
    });
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const databaseOptions = [
    {
      value: Database.MYSQL,
      label: "MySQL",
      icon: DATABASE[Database.MYSQL].image,
      description: "Popular open-source relational database",
    },
    {
      value: Database.POSTGRESQL,
      label: "PostgreSQL",
      icon: DATABASE[Database.POSTGRESQL].image,
      description: "Advanced open-source relational database",
    },
  ];

  return (
    <Modal
      centered
      title={
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <PlusCircleOutlined className="text-white text-sm" />
          </div>
          <div>
            <Title level={4} className="!mb-0 !text-gray-800">
              Create New Diagram
            </Title>
            <Text className="!text-sm !text-gray-500">
              Start building your database schema
            </Text>
          </div>
          {loading && <LoadingOutlined spin className="text-blue-500 ml-2" />}
        </div>
      }
      open={show}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={loading}
      width={600}
      styles={{
        content: {
          borderRadius: "16px",
          overflow: "hidden",
        },
      }}
      okText="Create Diagram"
      cancelText="Cancel"
      okButtonProps={{
        size: "large",
        className:
          "!bg-gradient-to-r !from-blue-500 !to-blue-600 !border-none hover:!from-blue-600 hover:!to-blue-700 !shadow-md hover:!shadow-lg !transition-all !duration-300 !rounded-lg !px-6",
      }}
      cancelButtonProps={{
        size: "large",
        className: "!rounded-lg !px-6 !border-gray-300 hover:!border-gray-400",
      }}
    >
      <div className="py-6">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: diagramDto.name,
            type: diagramDto.type,
          }}
        >
          {/* Diagram Name */}
          <Form.Item
            label={
              <div className="flex items-center gap-2">
                <DatabaseOutlined className="text-gray-600" />
                <Text className="!font-semibold !text-gray-700">
                  Diagram Name
                </Text>
              </div>
            }
            name="name"
            rules={[
              { required: true, message: "Please enter diagram name" },
              { min: 3, message: "Name must be at least 3 characters" },
              { max: 50, message: "Name must be less than 50 characters" },
            ]}
            className="mb-6"
          >
            <Input
              size="large"
              placeholder="Enter diagram name..."
              className="!rounded-lg !border-gray-200 hover:!border-blue-400 focus:!border-blue-500 !py-3"
              value={diagramDto.name}
              onChange={(e) => {
                setDiagramDto({
                  ...diagramDto,
                  name: e.target.value,
                });
              }}
            />
          </Form.Item>

          {/* Database Type */}
          <Form.Item
            label={
              <div className="flex items-center gap-2">
                <DatabaseOutlined className="text-gray-600" />
                <Text className="!font-semibold !text-gray-700">
                  Database Type
                </Text>
              </div>
            }
            name="type"
            rules={[{ required: true, message: "Please select database type" }]}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {databaseOptions.map((option) => (
                <Card
                  key={option.value}
                  className={`!cursor-pointer !transition-all !duration-200 !rounded-xl !border-2 ${
                    diagramDto.type === option.value
                      ? "!border-blue-500 !bg-blue-50 !shadow-md"
                      : "!border-gray-200 hover:!border-blue-300 hover:!shadow-sm"
                  }`}
                  styles={{ body: { padding: "24px" } }}
                  onClick={() => {
                    setDiagramDto({
                      ...diagramDto,
                      type: option.value,
                    });
                    form.setFieldValue("type", option.value);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar size={40} src={option.icon} shape="square" />
                    <div className="flex-1">
                      <Text className="!font-semibold !text-gray-800 !block">
                        {option.label}
                      </Text>
                      <Text className="!text-xs !text-gray-500">
                        {option.description}
                      </Text>
                    </div>
                    {diagramDto.type === option.value && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Form.Item>
        </Form>

        {/* Info Card */}
        <Card className="!mt-6 !bg-yellow-50 !border-yellow-200 !rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <DatabaseOutlined className="text-white text-sm" />
            </div>
            <div>
              <Text className="!font-semibold !text-yellow-500 !block !mb-1">
                Ready to Start?
              </Text>
              <Text className="!text-sm !text-yellow-500">
                Your diagram will be created with an empty canvas. You can start
                adding tables, relationships, and designing your database schema
                right away.
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  );
}
