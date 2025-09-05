import { Input } from "antd";
import { useEffect, useState } from "react";

interface EditableInputProps {
  initialValue: string;
  placeholder?: string;
  className?: string;
  onFinish: (value: string) => void;
}

export default function EditableInput({
  initialValue,
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
