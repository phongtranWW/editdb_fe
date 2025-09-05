import { Select } from "antd";
import type { BaseOptionType } from "antd/es/select";
import { useEffect, useState } from "react";

interface EditableSelectionProps<T> {
  initialValue: T;
  options: BaseOptionType[];
  finishSelect: (value: T) => void;
  className?: string;
  size?: "small" | "middle" | "large";
  menuItemSelectedIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export default function EditableSelection<T>({
  initialValue,
  options,
  className,
  size,
  finishSelect,
  menuItemSelectedIcon,
  suffixIcon,
}: EditableSelectionProps<T>) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Select
      className={className}
      suffixIcon={suffixIcon}
      menuItemSelectedIcon={menuItemSelectedIcon}
      size={size || "middle"}
      value={value}
      options={options}
      onFocus={() => setValue(value)}
      onChange={(value) => finishSelect(value)}
    ></Select>
  );
}
