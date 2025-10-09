import { DiagramProvider } from "../context/DiagramContext";
import { ViewProvider } from "../context/ViewContext";
import WorkSpace from "../components/Editor/WorkSpace";
import { ReactFlowProvider } from "@xyflow/react";
import { SaveProvider } from "../context/SaveContext";

export default function EditorPage() {
  return (
    <ViewProvider>
      <DiagramProvider>
        <SaveProvider>
          <ReactFlowProvider>
            <WorkSpace />
          </ReactFlowProvider>
        </SaveProvider>
      </DiagramProvider>
    </ViewProvider>
  );
}
