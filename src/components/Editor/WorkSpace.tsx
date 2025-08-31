import { Layout } from "antd";
import EditorHeader from "./EditorHeader/EditorHeader";
import { Content } from "antd/es/layout/layout";
import EditorSider from "./EditorSider/EditorSider";
import { EditorCanva } from "./EditorCanva/EditorCanva";
import { diagramService } from "../../services/diagrams/diagramService";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDiagram } from "../../hooks/useDiagram";
import { DatabaseType } from "../../data/constants";
import IssuesPanel from "./IssuesPanel/IssuesPanel";

export default function WorkSpace() {
  const { id } = useParams();
  const navigator = useNavigate();
  const { dispatch } = useDiagram();

  useEffect(() => {
    if (!id) {
      navigator("/404", { replace: true });
      return;
    }

    const fetchDiagram = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const diagram = await diagramService.getDiagram(id);
        dispatch({
          type: "SET_DIAGRAM",
          payload: {
            ...diagram,
            tablePositions: new Map(
              diagram.tables.map((table) => [table.id, table.position])
            ),
            type: DatabaseType.POSTGRESQL,
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        dispatch({
          type: "SET_ERROR",
          payload: error.message || "Error loading diagram",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchDiagram();
  }, [id, navigator, dispatch]);

  return (
    <Layout className="!h-screen flex flex-col">
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
