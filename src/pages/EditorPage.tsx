import { useNavigate, useParams } from "react-router";
import DiagramEditorLayout from "../components/Editor/EditorLayout";
import { DiagramDetailProvider } from "../context/DiagramDetailContext";
import { ViewProvider } from "../context/ViewContext";

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/");
    return null;
  }

  return (
    <ViewProvider>
      <DiagramDetailProvider id={id}>
        <DiagramEditorLayout />
      </DiagramDetailProvider>
    </ViewProvider>
  );
}
