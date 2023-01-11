import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectOption = ({
  name,
  label,
  value,
  onChange,
  data,
  style,
  size,
  selectCss,
  labelStyle,
  onFocus
}) => {
  return (
    <FormControl size={size} sx={style} >
      <InputLabel sx={labelStyle} id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        id={name}
        value={value || ""}
        name={name}
        label={label}
        onChange={onChange}
        sx={selectCss}
        required
        onFocus={onFocus}
        // MenuProps={{
        //   disableScrollLock: true,
        // }}

      >
        {data.map((info, index) => {
          const values = Object.values(info);
          return (
            <MenuItem key={index} value={values[0]}>
              {values[1]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectOption;
