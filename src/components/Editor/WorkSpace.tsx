import { Layout } from "antd";
import EditorHeader from "./EditorHeader/EditorHeader";
import { Content } from "antd/es/layout/layout";
import EditorSider from "./EditorSider/EditorSider";
import { EditorCanva } from "./EditorCanva/EditorCanva";
import IssuesPanel from "./IssuesPanel/IssuesPanel";
export default function WorkSpace() {
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
