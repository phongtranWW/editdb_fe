import { useCallback, useEffect, useState } from "react";
import type { ApiResponse } from "../../../api/base/api-response";
import type { Template } from "../../../models/template";
import type { Params } from "../../../api/base/params";
import { Card, Flex, Input, List, Select, Space } from "antd";
import { Sort } from "../../../data/constants";
import type { Diagram } from "../../../models/diagram";
import { TEMPLATES } from "../../../data/templates/templates";
import PreviewDiagramModal from "./PreviewDiagramModal";
import Meta from "antd/es/card/Meta";
import { createDiagram } from "../../../api/diagrams/diagramApi";
import { useNavigate } from "react-router";
import { useMessage } from "../../../hooks/useMessage";
import axios from "axios";

export const TemplatesContainer = () => {
  const navigator = useNavigate();
  const { error, loading, closeLoading, success } = useMessage();
  const [data, setData] = useState<ApiResponse<Template>>({
    data: [],
    total: 0,
  });
  const [params, setParams] = useState<Params>({
    page: 1,
    limit: 4,
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
    <Flex vertical align="center" justify="center" className="!w-full">
      <Space className="m-4">
        <Input
          className="xl:!w-[500px] lg:!w-[320px]"
          placeholder="Search templates"
          size="large"
          onChange={(e) => setParams({ ...params, search: e.target.value })}
        ></Input>
        <Select
          variant="outlined"
          className="xl:!w-[200px] lg:!w-[150px]"
          placeholder="Sort"
          options={[
            {
              value: Sort.ASC,
              label: "Ascending",
            },
            {
              value: Sort.DESC,
              label: "Descending",
            },
          ]}
          onChange={(value) => setParams({ ...params, sort: value })}
          size="large"
        />
      </Space>
      <List
        className="!w-full !p-8"
        grid={{ gutter: 16, xl: 4, lg: 3, md: 2, sm: 2, xs: 1 }}
        dataSource={TEMPLATES}
        renderItem={(template) => (
          <List.Item>
            <Card
              cover={<img alt={template.name} src={template.image} />}
              onClick={() => {
                setPreviewDiagram({
                  show: true,
                  diagram: template.diagram,
                });
              }}
              hoverable
            >
              <Meta
                title={template.name}
                description={
                  <p className="line-clamp-2 min-h-[3em]">
                    {template.description}
                  </p>
                }
              />
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
      <PreviewDiagramModal
        show={previewDiagram.show}
        diagram={previewDiagram.diagram}
        onClose={() => setPreviewDiagram({ show: false, diagram: undefined })}
        onConfirm={handleConfirm}
      />
    </Flex>
  );
};
