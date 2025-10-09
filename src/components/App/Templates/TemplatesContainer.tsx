import { useCallback, useState } from "react";
import { Flex, Input, List, Select } from "antd";
import { Sort } from "../../../data/constants";
import type { Diagram } from "../../../models/diagram";
import PreviewDiagramModal from "./PreviewDiagramModal";
import { createDiagram } from "../../../api/diagrams/diagramApi";
import { useNavigate } from "react-router";
import axios from "axios";
import { SearchOutlined, SortAscendingOutlined } from "@ant-design/icons";
import { useAppMessage } from "../../../context/AppMessageContext/hooks";
import TemplateCard from "./TemplateCard";
import { useTemplates } from "../../../hooks/useTemplates";
import LoaderModal from "../../UI/LoaderModal";

export const TemplatesContainer = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { messageApi } = useAppMessage();
  const navigator = useNavigate();
  const { data, params, setParams } = useTemplates();
  const [previewDiagram, setPreviewDiagram] = useState<{
    show: boolean;
    diagram?: Diagram;
  }>({
    show: false,
  });

  const handleConfirm = useCallback(async () => {
    if (!previewDiagram.diagram) {
      messageApi.error("No diagram selected");
      return;
    }
    setIsCreating(true);
    try {
      const diagram = await createDiagram({
        name: previewDiagram.diagram.name,
        type: previewDiagram.diagram.type,
        tables: previewDiagram.diagram.tables,
        relationships: previewDiagram.diagram.relationships,
      });
      messageApi.success("Diagram created successfully.");
      setPreviewDiagram({ show: false, diagram: undefined });
      navigator(`/diagrams/${diagram.id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 400) {
          messageApi.error("Invalid data. Please check your diagram details.");
        } else if (status === 401) {
          messageApi.error("You are not authorized. Please log in.");
          navigator("/login");
        } else {
          messageApi.error("Something went wrong. Please try again.");
        }
      } else {
        messageApi.error("Unexpected error occurred.");
      }
    } finally {
      setIsCreating(false);
    }
  }, [messageApi, navigator, previewDiagram.diagram, setPreviewDiagram]);

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
              <TemplateCard
                template={template}
                onClick={() =>
                  setPreviewDiagram({ show: true, diagram: template.diagram })
                }
              />
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

      <LoaderModal isVisible={isCreating} message="Creating diagram..." />
    </Flex>
  );
};
