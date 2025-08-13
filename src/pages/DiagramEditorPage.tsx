import DiagramEditorLayout from "../components/layouts/DiagramEditorLayout";
import { DiagramDetailProvider } from "../context/DiagramDetailContext";
import { ViewProvider } from "../context/ViewContext";

export default function DiagramEditorPage() {
  return (
    <ViewProvider>
      <DiagramDetailProvider>
        <DiagramEditorLayout />
      </DiagramDetailProvider>
    </ViewProvider>
  );
}
