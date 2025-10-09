import React from "react";

interface DropdownLabelProps {
  content: string;
  shortcut?: string;
  icons?: React.ReactNode;
  isSelected?: boolean;
  vaiant?: "checkbox" | "text";
}

export default function DropdownLabel({
  content,
  shortcut,
  icons,
  isSelected,
  vaiant,
}: DropdownLabelProps) {
  return (
    <div className="w-[250px] flex items-center justify-between gap-2">
      {vaiant === "checkbox" && (
        <div className="flex justify-center items-center w-3">
          {isSelected && icons}
        </div>
      )}

      <div className="flex-1 flex justify-between items-center">
        <p className="m-0">{content}</p>
        {shortcut && <span className="text-gray-400 text-sm">{shortcut}</span>}
      </div>
    </div>
  );
}
