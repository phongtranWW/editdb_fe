import { Button, Dropdown, Modal, Space, type MenuProps } from "antd";
import { useImageExporter } from "../../../hooks/useImageExporter";
import { DownOutlined } from "@ant-design/icons";
import { useMemo, useCallback, useState } from "react";
import { useDiagram } from "../../../hooks/useDiagram";
import { PSQLExporter } from "../../../utils/sql-export/psql-exporter";
import ReactCodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import type { Exporter } from "../../../utils/sql-export/exporter";
import { DatabaseType } from "../../../data/constants";
import { useIssues } from "../../../hooks/useIssues";
import { MySQLExporter } from "../../../utils/sql-export/mysql-exporter";

export default function FileDropDown() {
  const { exportImage } = useImageExporter();
  const {
    state: { tables, relationships, type, name },
    dispatch,
  } = useDiagram();
  const { hasNoError } = useIssues();

  // State
  const [previewSQL, setPreviewSQL] = useState<{
    show: boolean;
    sql: string;
  }>({
    show: false,
    sql: "",
  });

  // ============= IMAGE EXPORT ============
  const handleExportPng = useCallback(() => {
    exportImage({ format: "png", backgroundColor: "transparent" });
  }, [exportImage]);

  const handleExportJpg = useCallback(() => {
    exportImage({ format: "jpeg" });
  }, [exportImage]);

  const handleExportSvg = useCallback(() => {
    exportImage({ format: "svg" });
  }, [exportImage]);

  // ============= SQL EXPORT ============
  const handleExportSQL = useCallback(() => {
    if (!hasNoError()) {
      dispatch({
        type: "SET_ERROR",
        payload: `The diagram has issues.`,
      });
      return;
    }
    let exporter: Exporter;
    switch (type) {
      case DatabaseType.POSTGRESQL:
        exporter = new PSQLExporter(tables, relationships, name);
        break;
      case DatabaseType.MYSQL:
        exporter = new MySQLExporter(tables, relationships, name);
        break;
      default:
        return;
    }

    const sql = exporter.export();
    setPreviewSQL({ show: true, sql });
  }, [hasNoError, dispatch, tables, relationships, type, name]);

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
        label: "Save (coming soon)",
        key: "save",
        disabled: true,
      },
      {
        label: "Export as",
        key: "exportToImage",
        children: [
          {
            key: "exportPng",
            label: "PNG",
            onClick: handleExportPng,
          },
          {
            key: "exportJpg",
            label: "JPG",
            onClick: handleExportJpg,
          },
          {
            key: "exportSvg",
            label: "SVG",
            onClick: handleExportSvg,
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
        label: "Exit (coming soon)",
        key: "exit",
        disabled: true,
      },
    ],
    [handleExportPng, handleExportJpg, handleExportSvg, handleExportSQL]
  );

  // ============= RENDER ============
  return (
    <>
      <Dropdown menu={{ items: fileMenuItems }} placement="bottomLeft">
        <Button type="text">
          <Space>
            File <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <Modal
        className="!w-[1000px]"
        title="SQL Preview"
        closable={true}
        open={previewSQL.show}
        onOk={handleDownloadSQL}
        okText="Download SQL"
        onCancel={() => setPreviewSQL({ show: false, sql: "" })}
      >
        <ReactCodeMirror
          value={previewSQL.sql}
          extensions={[sql()]}
          editable={false}
        />
      </Modal>
    </>
  );
}
