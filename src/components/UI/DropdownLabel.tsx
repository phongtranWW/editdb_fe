interface DropdownLabelProps {
  content: string;
  shortcut?: string;
}

export default function DropdownLabel({
  content,
  shortcut,
}: DropdownLabelProps) {
  return (
    <div className="w-[250px] flex items-center justify-between gap-2">
      <p>{content}</p>
      <span className="text-gray-400 text-sm">{shortcut}</span>
    </div>
  );
}
