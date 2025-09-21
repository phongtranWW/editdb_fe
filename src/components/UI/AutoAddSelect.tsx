import { useState, useEffect } from "react";
import { Select } from "antd";
import type { DefaultOptionType } from "antd/es/select";

export interface AutoAddSelectProps {
  initialOptions: DefaultOptionType[];
  initialValue: string;
  placeholder?: string;
  allowClear?: boolean;
  showSearch?: boolean;
  className?: string;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  onChange?: (value: string) => void;
}

export default function AutoAddSelect({
  initialOptions,
  initialValue,
  placeholder,
  allowClear,
  showSearch = true,
  className,
  disabled,
  size,
  onChange,
}: AutoAddSelectProps) {
  const [options, setOptions] = useState<DefaultOptionType[]>(initialOptions);

  useEffect(() => {
    setOptions(initialOptions);
  }, [initialOptions]);

  return (
    <Select
      options={options}
      showSearch={showSearch}
      value={initialValue}
      onChange={onChange}
      onSearch={(value) => {
        if (
          value &&
          !options.find((o) => o.value?.toString().toLowerCase() === value)
        ) {
          setOptions([...options, { value, label: value }]);
        }
      }}
      placeholder={placeholder}
      allowClear={allowClear}
      className={className}
      disabled={disabled}
      size={size}
    />
  );
}
