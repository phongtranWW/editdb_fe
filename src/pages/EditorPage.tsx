import { DiagramProvider } from "../context/DiagramContext";
import { ReactFlowProvider } from "@xyflow/react";
import { ViewProvider } from "../context/ViewContext";
import WorkSpace from "../components/Editor/WorkSpace";
import { IssuesProvider } from "../context/IssuesContext";
import { ActionProvider } from "../context/ActionContext";
import { SelectionProvider } from "../context/SelectionContext";

export default function EditorPage() {
  return (
    <ViewProvider>
      <SelectionProvider>
        <DiagramProvider>
          <ActionProvider>
            <IssuesProvider>
              <ReactFlowProvider>
                <WorkSpace />
              </ReactFlowProvider>
            </IssuesProvider>
          </ActionProvider>
        </DiagramProvider>
      </SelectionProvider>
    </ViewProvider>
  );
}
