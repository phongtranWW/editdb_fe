import { Layout } from "antd";
import EditorHeader from "./EditorHeader/EditorHeader";
import { Content } from "antd/es/layout/layout";
import EditorSider from "./EditorSider/EditorSider";
import { EditorCanva } from "./EditorCanva/EditorCanva";
import IssuesPanel from "./IssuesPanel/IssuesPanel";
import ShortcutListener from "./ShortcutListener";
import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect } from "react";
import { handleApiError } from "../../utils/handleApiError";
import { getDiagram } from "../../api/diagrams/diagramApi";
import { useMessage } from "../../hooks/useMessage";
import { useDiagram } from "../../context/DiagramContext/hooks";

export default function WorkSpace() {
  const { error, loading, closeLoading } = useMessage();
  const { id } = useParams();
  const navigator = useNavigate();
  const { dispatch } = useDiagram();

  if (!id) navigator("/404");

  const fetchDiagram = useCallback(async () => {
    loading("Loading diagram...");
    try {
      const diagram = await getDiagram(id!);
      dispatch({ type: "SET_DIAGRAM", payload: diagram });
    } catch (err: unknown) {
      error(handleApiError(err, "Diagram"));
    } finally {
      closeLoading();
    }
  }, [id, dispatch, loading, error, closeLoading]);

  useEffect(() => {
    fetchDiagram();
  }, [fetchDiagram]);

  return (
    <Layout className="!h-screen flex flex-col">
      <ShortcutListener />
      <EditorHeader />
      <Layout className="flex">
        <EditorSider />
        <Content className="flex-1 bg-white">
          <EditorCanva />
        </Content>
        <IssuesPanel />
      </Layout>
    </Layout>
  );
}
