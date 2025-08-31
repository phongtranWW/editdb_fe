import { DiagramProvider } from "../context/DiagramContext/context";
import { ReactFlowProvider } from "@xyflow/react";
import { ViewProvider } from "../context/ViewContext/context";
import WorkSpace from "../components/Editor/WorkSpace";
import { IssuesProvider } from "../context/IssuesContext";

export default function EditorPage() {
  return (
    <ViewProvider>
      <DiagramProvider>
        <IssuesProvider>
          <ReactFlowProvider>
            <WorkSpace />
          </ReactFlowProvider>
        </IssuesProvider>
      </DiagramProvider>
    </ViewProvider>
  );
}
