import { Layout } from "antd";
import { useView } from "../../hooks/useView";
import EditorHeader from "./EditorHeader";
import { Content } from "antd/es/layout/layout";
import { EditorCanva } from "./EditorCanva/EditorCanva";
import EditorSider from "./EditorSider/EditorSider";

export default function DiagramEditorLayout() {
  const { showMenu } = useView();

  return (
    <Layout className="!h-screen flex flex-col">
      <EditorHeader />
      <Layout className="flex">
        {showMenu && <EditorSider />}
        <Content className="flex-1 bg-white">
          <EditorCanva />
        </Content>
      </Layout>
    </Layout>
  );
}
