export interface SaveContextValue {
  saving: "loading" | "dirty" | "idle";
  setSaving: React.Dispatch<React.SetStateAction<"loading" | "dirty" | "idle">>;
}
