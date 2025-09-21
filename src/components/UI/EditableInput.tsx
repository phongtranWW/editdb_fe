import { Input } from "antd";
import { useEffect, useState } from "react";

interface EditableInputProps {
  initialValue: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  onFinish: (value: string) => void;
}

export default function EditableInput({
  initialValue,
  disabled = false,
  placeholder,
  className,
  onFinish,
}: EditableInputProps) {
  const [tmpValue, setTmpValue] = useState<string>("");

  useEffect(() => {
    setTmpValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      disabled={disabled}
      className={className}
      placeholder={placeholder}
      size="small"
      value={tmpValue}
      onFocus={() => setTmpValue(tmpValue)}
      onBlur={() => onFinish(tmpValue)}
      onChange={(e) => setTmpValue(e.target.value)}
    />
  );
}
