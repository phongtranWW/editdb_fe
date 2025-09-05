import type { Diagram } from "./diagram";

export interface Template {
  id: string;
  image: string;
  name: string;
  description: string;
  diagram: Diagram;
}
