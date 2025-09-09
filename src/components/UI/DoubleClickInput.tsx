import { Input } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface DoubleClickInputProps {
  initialValue: string;
  placeholder?: string;
  classes?: {
    root?: string;
    title?: string;
    input?: string;
  };
  onFinish: (value: string) => void;
}

export default function DoubleClickInput({
  initialValue,
  placeholder,
  classes,
  onFinish,
}: DoubleClickInputProps) {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleFinish = () => {
    setShowInput(false);
    if (value.trim() !== "") onFinish(value);
    else setValue(initialValue);
  };

  return (
    <div className={classes?.root}>
      {showInput ? (
        <Input
          className={clsx("!p-0", classes?.input)}
          placeholder={placeholder}
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleFinish}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleFinish();
            if (e.key === "Escape") setShowInput(false);
          }}
        />
      ) : (
        <p
          title="Double click to edit"
          className={clsx("cursor-default truncate", classes?.title)}
          onDoubleClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            setShowInput(true);
          }}
        >
          {value}
        </p>
      )}
    </div>
  );
}
