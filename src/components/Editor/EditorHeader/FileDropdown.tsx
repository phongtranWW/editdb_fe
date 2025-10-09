import { Button, Dropdown, Modal, type MenuProps } from "antd";
import { useImageExporter } from "../../../hooks/useImageExporter";
import { useMemo, useCallback, useState } from "react";
import { PSQLExporter } from "../../../utils/sql-export/psql-exporter";
import ReactCodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import type { Exporter } from "../../../utils/sql-export/exporter";
import { Database } from "../../../data/constants";
import { useNavigate } from "react-router";
import { useUnsavedChangesWarning } from "../../../hooks/useUnsavedChangesWarning";
import { MySQLExporter } from "../../../utils/sql-export/mysql-exporter";
import DropdownLabel from "../../UI/DropdownLabel";
import { useDiagram } from "../../../context/DiagramContext/hooks";
import { useSave } from "../../../context/SaveContext/hooks";
import { useAppMessage } from "../../../context/AppMessageContext/hooks";

export default function FileDropdown() {
  const navigator = useNavigate();
  const { messageApi } = useAppMessage();
  const { exportImage } = useImageExporter();
  const { state, canExport } = useDiagram();
  const { saving, save } = useSave();
  useUnsavedChangesWarning(saving !== "idle");

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
    if (!canExport()) {
      messageApi.error("Please fix all issues before exporting SQL.");
      return;
    }

    let exporter: Exporter;

    try {
      switch (state.data.type) {
        case Database.POSTGRESQL:
          exporter = new PSQLExporter(
            state.data.tables,
            state.data.relationships
          );
          break;
        case Database.MYSQL:
          exporter = new MySQLExporter(
            state.data.tables,
            state.data.relationships
          );
          break;
        default:
          messageApi.error(`Unsupported database type: ${state.data.type}`);
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
  }, [
    canExport,
    messageApi,
    state.data.relationships,
    state.data.tables,
    state.data.type,
  ]);

  const handleDownloadSQL = useCallback(() => {
    const blob = new Blob([previewSQL.sql], { type: "text/sql" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "diagram.sql";
    link.click();
    URL.revokeObjectURL(url);
  }, [previewSQL.sql]);

  // ============= MENU ITEMS ============
  const fileMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: <DropdownLabel content="Save" shortcut="Ctrl + S" />,
        key: "save",
        onClick: () => save(),
      },
      {
        label: <DropdownLabel content="Export Image" />,
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
        label: <DropdownLabel content="Export SQL" />,
        key: "exportSQL",
        onClick: handleExportSQL,
      },
      {
        label: <DropdownLabel content="Exit" />,
        key: "exit",
        onClick: () => {
          navigator("/");
        },
      },
    ],
    [handleExportImage, handleExportSQL, navigator, save]
  );

  // ============= RENDER ============
  return (
    <>
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
