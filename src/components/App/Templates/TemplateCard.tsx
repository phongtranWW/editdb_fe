import { Card } from "antd";
import type { Template } from "../../../models/template";
const { Meta } = Card;

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
}

export default function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <Card
      className="!h-full !border-none !shadow-lg hover:!shadow-2xl !transition-all !duration-300 !transform hover:!scale-105 !bg-white/90 !backdrop-blur-sm !rounded-xl !overflow-hidden group"
      cover={
        <div className="relative overflow-hidden">
          <img
            alt={template.name}
            src={template.image}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to preview
          </div>
        </div>
      }
      onClick={onClick}
      hoverable
      styles={{ body: { padding: "20px" } }}
    >
      <Meta
        title={
          <p className="mb-2 text-gray-800 font-semibold line-clamp-1">
            {template.name}
          </p>
        }
        description={
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed min-h-[4.5em]">
            {template.description}
          </p>
        }
      />
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end">
        <div className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors">
          Preview →
        </div>
      </div>
    </Card>
  );
}
