import { DiagramProvider } from "../context/DiagramContext/context";
import { ReactFlowProvider } from "@xyflow/react";
import { ViewProvider } from "../context/ViewContext/context";
import WorkSpace from "../components/Editor/WorkSpace";
import { IssuesProvider } from "../context/IssuesContext";
import { ActionProvider } from "../context/ActionContext";
import { DesignProvider } from "../context/DesignContext";

export default function EditorPage() {
  return (
    <ViewProvider>
      <DiagramProvider>
        <ActionProvider>
          <IssuesProvider>
            <ReactFlowProvider>
              <DesignProvider>
                <WorkSpace />
              </DesignProvider>
            </ReactFlowProvider>
          </IssuesProvider>
        </ActionProvider>
      </DiagramProvider>
    </ViewProvider>
  );
}
