import { Layout, Modal } from "antd";
import EditorHeader from "./EditorHeader/EditorHeader";
import { Content } from "antd/es/layout/layout";
import EditorSider from "./EditorSider/EditorSider";
import { EditorCanva } from "./EditorCanva/EditorCanva";
import IssuesPanel from "./IssuesPanel/IssuesPanel";
import { useEffect, useState } from "react";
import { getDiagram } from "../../api/diagrams/diagramApi";
import { useDiagram } from "../../context/DiagramContext/hooks";
import { useParams } from "react-router";
import { handleApiError } from "../../utils/handleApiError";
import Shortcut from "./Shortcut";
import { useAppMessage } from "../../context/AppMessageContext/hooks";

export default function WorkSpace() {
  const { id } = useParams();
  const { messageApi } = useAppMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch } = useDiagram();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const diagram = await getDiagram(id!);
        dispatch({ type: "SET_DIAGRAM", payload: diagram });
      } catch (err: unknown) {
        messageApi.error(handleApiError(err, "Diagram"));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, dispatch, messageApi, setLoading]);

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
      <Shortcut />
      <Modal
        open={loading}
        footer={null}
        closable={false}
        centered
        closeIcon={null}
      />
    </Layout>
  );
}
