import { Select } from "antd";
import type { BaseOptionType } from "antd/es/select";
import { useEffect, useState } from "react";

interface EditableSelectionProps<T> {
  initialValue: T;
  options: BaseOptionType[];
  finishSelect: (value: T) => void;
  className?: string;
  size: "small" | "middle" | "large";
}

export default function EditableSelection<T>({
  initialValue,
  options,
  className,
  size,
  finishSelect,
}: EditableSelectionProps<T>) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Select
      className={className}
      size={size}
      value={value}
      options={options}
      onFocus={() => setValue(value)}
      onBlur={() => finishSelect(value)}
      onChange={(value) => setValue(value)}
    ></Select>
  );
}
