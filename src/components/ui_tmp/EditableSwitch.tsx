import { Button } from "antd";
import { useEffect, useState } from "react";

interface EditableSwitchProps {
  initialValue: boolean;
  finish: (value: boolean) => void;
  icon?: React.ReactNode;
  className?: string;
  size?: "small" | "middle" | "large";
  color?:
    | "primary"
    | "danger"
    | "default"
    | "blue"
    | "purple"
    | "cyan"
    | "green"
    | "magenta"
    | "pink"
    | "red"
    | "orange"
    | "yellow"
    | "volcano"
    | "geekblue"
    | "lime"
    | "gold"
    | undefined;
}

export default function EditableSwitch({
  initialValue,
  finish,
  icon,
  className,
  size,
  color,
}: EditableSwitchProps) {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(initialValue);
  }, [initialValue]);

  return (
    <Button
      className={className}
      size={size || "small"}
      color={color || "primary"}
      variant={checked ? "solid" : "outlined"}
      onClick={() => {
        finish(!checked);
      }}
    >
      {icon}
    </Button>
  );
}
