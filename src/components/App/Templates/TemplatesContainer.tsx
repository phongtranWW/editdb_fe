import { useCallback, useEffect, useState } from "react";
import type { ApiResponse } from "../../../api/base/api-response";
import type { Template } from "../../../models/template";
import type { Params } from "../../../api/base/params";
import { Card, Flex, Input, List, Select, Typography } from "antd";
import { Sort } from "../../../data/constants";
import type { Diagram } from "../../../models/diagram";
import { TEMPLATES } from "../../../data/templates/templates";
import PreviewDiagramModal from "./PreviewDiagramModal";
import Meta from "antd/es/card/Meta";
import { createDiagram } from "../../../api/diagrams/diagramApi";
import { useNavigate } from "react-router";
import { useMessage } from "../../../hooks/useMessage";
import axios from "axios";
import { SearchOutlined, SortAscendingOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const TemplatesContainer = () => {
  const navigator = useNavigate();
  const { error, loading, closeLoading, success } = useMessage();
  const [data, setData] = useState<ApiResponse<Template>>({
    data: [],
    total: 0,
  });
  const [params, setParams] = useState<Params>({
    page: 1,
    limit: 8,
    sort: Sort.ASC,
  });
  const [previewDiagram, setPreviewDiagram] = useState<{
    show: boolean;
    diagram?: Diagram;
  }>({
    show: false,
  });

  useEffect(() => {
    let result = [...TEMPLATES];

    if (params.search && params.search.trim() !== "") {
      const keyword = params.search.toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(keyword));
    }

    if (params.sort === Sort.ASC) {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (params.sort === Sort.DESC) {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    const total = result.length;

    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    result = result.slice(start, end);

    setData({
      data: result,
      total,
    });
  }, [params]);

  const handleConfirm = useCallback(async () => {
    if (!previewDiagram.diagram) {
      error("No diagram selected");
      return;
    }
    loading("Creating diagram...");
    try {
      const diagram = await createDiagram({
        name: previewDiagram.diagram.name,
        type: previewDiagram.diagram.type,
        tables: previewDiagram.diagram.tables,
        relationships: previewDiagram.diagram.relationships,
      });
      success("Diagram created successfully.");
      setPreviewDiagram({ show: false, diagram: undefined });
      navigator(`/diagrams/${diagram.id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 400) {
          error("Invalid data. Please check your diagram details.");
        } else if (status === 401) {
          error("You are not authorized. Please log in.");
          navigator("/login");
        } else {
          error("Something went wrong. Please try again.");
        }
      } else {
        error("Unexpected error occurred.");
      }
    } finally {
      closeLoading();
    }
  }, [
    previewDiagram.diagram,
    navigator,
    error,
    loading,
    closeLoading,
    success,
  ]);

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      className="!w-full !max-w-7xl !mx-auto"
    >
      {/* Header with search and filter */}
      <div className="w-full mb-8 px-8">
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full lg:max-w-md">
              <Input
                className="!h-12 !text-lg !border-gray-200 !rounded-lg hover:!border-blue-400 focus:!border-blue-500 !shadow-sm"
                placeholder="Search templates..."
                prefix={<SearchOutlined className="text-gray-400" />}
                size="large"
                onChange={(e) =>
                  setParams({ ...params, search: e.target.value, page: 1 })
                }
              />
            </div>
            <Select
              className="!w-48 !h-12"
              placeholder="Sort templates"
              prefix={<SortAscendingOutlined />}
              options={[
                { value: Sort.ASC, label: "A to Z" },
                { value: Sort.DESC, label: "Z to A" },
              ]}
              onChange={(value) => setParams({ ...params, sort: value })}
              size="large"
            />
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="w-full px-8">
        <List
          className="!w-full"
          grid={{
            gutter: [24, 24],
            xl: 4,
            lg: 3,
            md: 2,
            sm: 2,
            xs: 1,
          }}
          dataSource={data.data}
          renderItem={(template) => (
            <List.Item>
              <Card
                className="!h-full !border-none !shadow-lg hover:!shadow-2xl !transition-all !duration-300 !transform hover:!scale-105 !bg-white/90 !backdrop-blur-sm !rounded-xl !overflow-hidden group"
                cover={
                  <div className="relative overflow-hidden">
                    <img
                      alt={template.name}
                      src={template.image}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to preview
                    </div>
                  </div>
                }
                onClick={() => {
                  setPreviewDiagram({
                    show: true,
                    diagram: template.diagram,
                  });
                }}
                hoverable
                styles={{ body: { padding: "20px" } }}
              >
                <Meta
                  title={
                    <Title
                      level={5}
                      className="!mb-2 !text-gray-800 !font-semibold line-clamp-1"
                    >
                      {template.name}
                    </Title>
                  }
                  description={
                    <p className="!text-gray-600 !text-sm line-clamp-3 !leading-relaxed min-h-[4.5em]">
                      {template.description}
                    </p>
                  }
                />
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 font-medium">
                      Ready to use
                    </span>
                  </div>
                  <div className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Preview →
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
          pagination={{
            total: data.total,
            current: params.page,
            pageSize: params.limit,
            onChange: (page, pageSize) => {
              setParams({
                ...params,
                page,
                limit: pageSize,
              });
            },
          }}
        />
      </div>

      <PreviewDiagramModal
        show={previewDiagram.show}
        diagram={previewDiagram.diagram}
        onClose={() => setPreviewDiagram({ show: false, diagram: undefined })}
        onConfirm={handleConfirm}
      />
    </Flex>
  );
};
