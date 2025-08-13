import { Layout } from "antd";
import DiagramEditorHeader from "../headers/DiagramEditorHeader";
import { useView } from "../../hooks/useView";
import { CanvaReactFlow } from "../ui/CanvaReactFlow";
import { Content } from "antd/es/layout/layout";
import EditorSider from "../EditorSider/EditorSider";

export default function DiagramEditorLayout() {
  const { showMenu } = useView();

  return (
    <Layout className="!h-screen flex flex-col">
      <DiagramEditorHeader />
      <Layout className="flex">
        {showMenu && <EditorSider />}
        <Content className="flex-1 bg-white">
          <CanvaReactFlow />
        </Content>
      </Layout>
    </Layout>
  );
}
