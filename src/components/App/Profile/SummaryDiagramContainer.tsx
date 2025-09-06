import {
  Button,
  Flex,
  Input,
  List,
  Select,
  Space,
  Typography,
  Card,
  Avatar,
  Tag,
  Tooltip,
} from "antd";
import { useSummaryDiagrams } from "../../../hooks/useSummaryDiagrams";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  DatabaseOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Sort } from "../../../data/constants";
import { useNavigate } from "react-router";
import { useState } from "react";
import { DATABASE } from "../../../data/database";
import CreateDiagramModal from "./CreateDiagramModal";
import type { CreateDiagramDto } from "../../../api/diagrams/dtos/create-diagram-dto";

const { Text, Title } = Typography;

export function SummaryDiagramContainer() {
  const navigator = useNavigate();
  const { data, loading, params, setParams, deleteSDiagram, createSDiagram } =
    useSummaryDiagrams();
  const [showCreateDiagramModal, setShowCreateDiagramModal] = useState(false);

  return (
    <Card className="!w-full !border-none !shadow-2xl !bg-white/90 !backdrop-blur-sm !rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <DatabaseOutlined className="text-white text-lg" />
          </div>
          <div>
            <Title level={3} className="!mb-0 !text-gray-800">
              My Diagrams
            </Title>
            <Text className="!text-sm !text-gray-500">
              Manage your database diagrams
              {loading && <LoadingOutlined spin className="!ml-2" />}
            </Text>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => setShowCreateDiagramModal(true)}
          className="!bg-gradient-to-r !from-blue-500 !to-blue-600 !border-none hover:!from-blue-600 hover:!to-blue-700 !shadow-lg hover:!shadow-xl !transition-all !duration-300 !rounded-lg !px-6"
        >
          New Diagram
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6">
        <div className="bg-gray-50 rounded-xl p-4">
          <Space size="middle" className="w-full">
            <Input
              className="!flex-1 !h-10 !border-gray-200 !rounded-lg hover:!border-blue-400 focus:!border-blue-500"
              placeholder="Search diagrams..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={(e) => setParams({ ...params, search: e.target.value })}
            />
            <Select
              className="!w-40 !h-10"
              placeholder="Sort by"
              prefix={<SortAscendingOutlined />}
              options={[
                { value: Sort.ASC, label: "A to Z" },
                { value: Sort.DESC, label: "Z to A" },
              ]}
              value={params.sort}
              onChange={(value) => setParams({ ...params, sort: value })}
            />
          </Space>
        </div>
      </div>

      {/* Diagrams List */}
      <List
        className="!w-full"
        dataSource={data.data}
        renderItem={(sD) => (
          <List.Item>
            <Flex
              align="center"
              justify="space-between"
              className="!w-full !p-4"
            >
              <Flex align="center" gap={16}>
                {/* Database Icon */}
                <div className="relative">
                  <Avatar
                    shape="square"
                    size={48}
                    src={DATABASE[sD.type || "MYSQL"].image}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* Diagram Info */}
                <div>
                  <Title
                    level={5}
                    className="!mb-1 !text-gray-800 !font-semibold"
                  >
                    {sD.name}
                  </Title>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <Tag
                      color="blue"
                      className="!rounded-full !px-2 !py-0 !text-xs !font-medium !uppercase"
                    >
                      {sD.type || "MYSQL"}
                    </Tag>
                    <div className="flex items-center gap-1">
                      <CalendarOutlined className="text-xs" />
                      <span>
                        Updated: {new Date(sD.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Flex>

              {/* Action Buttons */}
              <Space size="small">
                <Tooltip title="Edit diagram">
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => navigator(`/diagrams/${sD.id}`)}
                    className="!w-10 !h-10 !rounded-lg !border !border-gray-200 hover:!border-blue-400 hover:!bg-blue-50 !transition-all !duration-200"
                  />
                </Tooltip>
                <Tooltip title="Delete diagram">
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteSDiagram(sD.id)}
                    className="!w-10 !h-10 !rounded-lg !border !border-gray-200 hover:!border-red-400 hover:!bg-red-50 !transition-all !duration-200"
                  />
                </Tooltip>
              </Space>
            </Flex>
          </List.Item>
        )}
        pagination={{
          total: data.total,
          current: params.page,
          pageSize: params.limit,
          onChange: (page: number, pageSize: number) => {
            setParams({
              ...params,
              page,
              limit: pageSize,
            });
          },
        }}
      />

      <CreateDiagramModal
        loading={loading}
        show={showCreateDiagramModal}
        onClose={() => setShowCreateDiagramModal(false)}
        onOk={(dto: CreateDiagramDto) => {
          createSDiagram(dto);
          setShowCreateDiagramModal(false);
        }}
      />
    </Card>
  );
}
