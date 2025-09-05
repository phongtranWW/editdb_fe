import { Button, Flex, Input, List, Select, Space, Typography } from "antd";
import { useSummaryDiagrams } from "../../../hooks/useSummaryDiagrams";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Sort } from "../../../data/constants";
import { useNavigate } from "react-router";
import { useState } from "react";
import { DATABASE } from "../../../data/database";
import CreateDiagramModal from "./CreateDiagramModal";
import type { CreateDiagramDto } from "../../../api/diagrams/dtos/create-diagram-dto";

const { Text } = Typography;

export function SummaryDiagramContainer() {
  const navigator = useNavigate();
  const { data, loading, params, setParams, deleteSDiagram, createSDiagram } =
    useSummaryDiagrams();
  const [showCreateDiagramModal, setShowCreateDiagramModal] = useState(false);

  return (
    <Flex
      align="center"
      justify="center"
      className="!w-full !rounded-lg !border-1 !border-gray-300"
    >
      <Flex vertical align="center" justify="start" className="!w-full">
        <Flex
          align="center"
          justify="space-between"
          className="!w-full !px-4 !py-3 !border-b-1 !border-gray-300"
        >
          <Text className="!font-semibold !text-xl !text-orange-400">
            Diagrams {loading && <LoadingOutlined spin className="!ml-2" />}
          </Text>
          <Space size="small">
            <Input
              size="middle"
              placeholder="Search"
              onChange={(e) => setParams({ ...params, search: e.target.value })}
            />
            <Select
              size="middle"
              placeholder="Sort"
              options={[
                { value: Sort.ASC, label: "Ascending" },
                { value: Sort.DESC, label: "Descending" },
              ]}
              value={params.sort}
              onChange={(value) => setParams({ ...params, sort: value })}
            />
            <Button
              color="primary"
              size="middle"
              variant="filled"
              onClick={() => setShowCreateDiagramModal(true)}
            >
              <PlusOutlined />
            </Button>
          </Space>
        </Flex>
        <List
          className="!w-full !pb-4"
          dataSource={data.data}
          renderItem={(sD, index) => (
            <List.Item className={`${index % 2 === 0 ? "bg-gray-100" : ""}`}>
              <Flex
                align="center"
                justify="space-between"
                className="!w-full !px-4"
              >
                <Space>
                  <img src={DATABASE[sD.type || "MYSQL"].image} width={24} />
                  <Text className="!text-base !font-semibold">{sD.name}</Text>
                </Space>
                <Space size="small">
                  <Text className="!text-xs !text-gray-500">
                    Upd: {new Date(sD.updatedAt).toLocaleString()}
                  </Text>
                  <Button
                    color="primary"
                    variant="filled"
                    onClick={() => navigator(`/diagrams/${sD.id}`)}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    color="danger"
                    variant="filled"
                    onClick={() => deleteSDiagram(sD.id)}
                  >
                    <DeleteOutlined />
                  </Button>
                </Space>
              </Flex>
            </List.Item>
          )}
          pagination={{
            total: data.total,
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
      </Flex>
      <CreateDiagramModal
        loading={loading}
        show={showCreateDiagramModal}
        onClose={() => setShowCreateDiagramModal(false)}
        onOk={(dto: CreateDiagramDto) => {
          createSDiagram(dto);
          setShowCreateDiagramModal(false);
        }}
      />
    </Flex>
  );
}
