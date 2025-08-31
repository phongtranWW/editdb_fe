import {
  getNodesBounds,
  getViewportForBounds,
  useReactFlow,
} from "@xyflow/react";
import { toJpeg, toPng, toSvg } from "html-to-image";
import type { Options } from "html-to-image/lib/types";
import { useCallback } from "react";

type ExportFormat = "png" | "jpeg" | "svg";

interface ExportOptions {
  format?: ExportFormat;
  filename?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
  minZoom?: number;
  maxZoom?: number;
  padding?: number;
  element?: HTMLElement | null;
}

const DEFAULT_OPTIONS: Required<Omit<ExportOptions, "element">> = {
  format: "png",
  filename: "diagram",
  backgroundColor: "#fff",
  width: 1920,
  height: 1080,
  minZoom: 0.5,
  maxZoom: 1,
  padding: 2,
};

export const useImageExporter = () => {
  const { getNodes } = useReactFlow();

  const exportImage = useCallback(
    async (opts: ExportOptions = {}) => {
      const {
        format,
        filename,
        backgroundColor,
        width,
        height,
        minZoom,
        maxZoom,
        padding,
        element = document.querySelector(
          ".react-flow__viewport"
        ) as HTMLElement,
      } = { ...DEFAULT_OPTIONS, ...opts };

      if (!element) return;

      const nodesBounds = getNodesBounds(getNodes());
      const viewport = getViewportForBounds(
        nodesBounds,
        width,
        height,
        minZoom,
        maxZoom,
        padding
      );

      const options: Options = {
        width,
        height,
        backgroundColor,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      };

      const exporters: Record<
        ExportFormat,
        (el: HTMLElement, o: Options) => Promise<string>
      > = {
        png: toPng,
        jpeg: toJpeg,
        svg: toSvg,
      };

      const dataUrl = await exporters[format](element, options);

      const link = document.createElement("a");
      link.download = `${filename}.${format}`;
      link.href = dataUrl;
      link.click();
    },
    [getNodes]
  );

  return { exportImage };
};
