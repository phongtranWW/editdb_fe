import { Tag } from "antd";

interface DataTypeTagProps {
  type: string;
}

export default function DataTypeTag({ type }: DataTypeTagProps) {
  return (
    <Tag
      className="rounded-full px-3 py-1 text-xs font-semibold"
      color="orange"
    >
      {type}
    </Tag>
  );
}
