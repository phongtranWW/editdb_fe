import { DiagramProvider } from "../context/DiagramContext/context";
import { ReactFlowProvider } from "@xyflow/react";
import { ViewProvider } from "../context/ViewContext/context";
import WorkSpace from "../components/Editor/WorkSpace";
import { IssuesProvider } from "../context/IssuesContext";
import { ActionProvider } from "../context/ActionContext";
import { useNavigate, useParams } from "react-router";
import { DesignProvider } from "../context/DesignContext";

export default function EditorPage() {
  const { id } = useParams();
  const navigator = useNavigate();

  if (!id) {
    navigator("/404", { replace: true });
    return;
  }

  return (
    <ViewProvider>
      <DiagramProvider id={id}>
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
