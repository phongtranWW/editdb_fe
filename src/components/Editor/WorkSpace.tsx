import { Layout } from "antd";
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
import LoaderModal from "../UI/LoaderModal";

export default function WorkSpace() {
  const { id } = useParams();
  const { messageApi } = useAppMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useDiagram();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const diagram = await getDiagram(id!);
        dispatch({ type: "SET_DIAGRAM", payload: diagram });
      } catch (err: unknown) {
        messageApi.error(handleApiError(err, "Diagram"));
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id, dispatch, messageApi, setIsLoading]);

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
      <LoaderModal isVisible={isLoading} message="Loading diagram..." />
    </Layout>
  );
}
