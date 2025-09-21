import { Button, Dropdown, message, Modal, type MenuProps } from "antd";
import { useImageExporter } from "../../../hooks/useImageExporter";
import { useMemo, useCallback, useState } from "react";
import { useDiagram } from "../../../hooks/useDiagram";
import { PSQLExporter } from "../../../utils/sql-export/psql-exporter";
import ReactCodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import type { Exporter } from "../../../utils/sql-export/exporter";
import { Database } from "../../../data/constants";
import { useIssues } from "../../../hooks/useIssues";
import { useAction } from "../../../hooks/useAction";
import { useNavigate } from "react-router";
import { useUnsavedChangesWarning } from "../../../hooks/useUnsavedChangesWarning";

export default function FileDropDown() {
  const navigator = useNavigate();
  const { exportImage } = useImageExporter();
  const {
    state: { tables, relationships, type, name },
  } = useDiagram();
  const [messageApi, contextHolder] = message.useMessage();
  const { hasNoError } = useIssues();
  const { saved, saveAction } = useAction();
  useUnsavedChangesWarning(!saved);

  // State
  const [previewSQL, setPreviewSQL] = useState<{
    show: boolean;
    sql: string;
  }>({
    show: false,
    sql: "",
  });

  // ============= IMAGE EXPORT ============
  const handleExportImage = useCallback(
    (type: string) => {
      switch (type) {
        case "png":
          exportImage({ format: "png", backgroundColor: "transparent" });
          break;
        case "jpeg":
          exportImage({ format: "jpeg" });
          break;
        case "svg":
          exportImage({ format: "svg" });
          break;
        default:
          break;
      }
    },
    [exportImage]
  );

  // ============= SQL EXPORT ============
  const handleExportSQL = useCallback(() => {
    if (!hasNoError()) {
      messageApi.error("There are errors in the diagram");
      return;
    }

    let exporter: Exporter;

    try {
      switch (type) {
        case Database.POSTGRESQL:
          exporter = new PSQLExporter(tables, relationships);
          break;
        default:
          messageApi.warning(`Unsupported database type: ${type}`);
          return;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        messageApi.error(err.message);
      } else {
        messageApi.error("Unexpected error occurred.");
      }
      return;
    }

    const sql = exporter.export();
    setPreviewSQL({ show: true, sql });
  }, [hasNoError, tables, relationships, type, messageApi]);

  const handleDownloadSQL = useCallback(() => {
    const blob = new Blob([previewSQL.sql], { type: "text/sql" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name || "diagram"}.sql`;
    link.click();
    URL.revokeObjectURL(url);
  }, [previewSQL.sql, name]);

  // ============= MENU ITEMS ============
  const fileMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: "Save",
        key: "save",
        onClick: () => saveAction(),
      },
      {
        label: "Export as",
        key: "exportToImage",
        children: [
          {
            key: "exportPng",
            label: "PNG",
            onClick: () => handleExportImage("png"),
          },
          {
            key: "exportJpg",
            label: "JPG",
            onClick: () => handleExportImage("jpeg"),
          },
          {
            key: "exportSvg",
            label: "SVG",
            onClick: () => handleExportImage("svg"),
          },
        ],
      },
      {
        label: "Export SQL",
        key: "exportSQL",
        onClick: handleExportSQL,
      },
      {
        label: "Delete (coming soon)",
        key: "delete",
        disabled: true,
      },
      {
        label: "Exit", // Removed "coming soon"
        key: "exit",
        onClick: () => {
          navigator("/");
        },
      },
    ],
    [handleExportImage, handleExportSQL, saveAction, navigator]
  );

  // ============= RENDER ============
  return (
    <>
      {contextHolder}
      <Dropdown
        menu={{ items: fileMenuItems }}
        placement="bottomLeft"
        trigger={["click"]}
      >
        <Button type="text" size="small">
          File
        </Button>
      </Dropdown>

      {/* SQL Preview Modal */}
      <Modal
        className="!w-[1000px]"
        title="SQL Preview"
        closable={true}
        open={previewSQL.show}
        onOk={handleDownloadSQL}
        okText="Download SQL"
        onCancel={() => setPreviewSQL({ show: false, sql: "" })}
        styles={{
          body: { maxHeight: "70vh", overflowY: "auto" },
        }}
      >
        <ReactCodeMirror
          value={previewSQL.sql}
          extensions={[sql()]}
          editable={false}
          className="!text-xs !border !rounded !max-h-[60vh] !overflow-y-auto"
        />
      </Modal>
    </>
  );
}
