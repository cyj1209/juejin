import React, { Props } from "react";
import { Select } from "antd";

interface TypeSelectProps {
  defaultValue: string | number;
  onChange: (e: string | number) => void | Promise<void>;
  selectList: SelectItem[];
  className?: string;
}

interface SelectItem {
  name: string;
  value: string | number;
}

const TypeSelect: React.FC<TypeSelectProps> = props => {
  return (
    <Select
      className={"type-select" + " " + (props.className || " ")}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    >
      {props.selectList.map(({ name, value }) => (
        <Select.Option key={value} value={value}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default TypeSelect;
