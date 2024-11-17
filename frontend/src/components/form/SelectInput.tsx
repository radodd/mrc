import React, { forwardRef } from "react";
import { SelectInputProps } from "../../lib/formTypes";
import SelectChevron from "../icons/ContactFormSelectIcon";

import style from "./ContactForm.module.scss";

export const positionOptions = [
  { value: "Landscape Architect", label: "Landscape Architect" },
  { value: "Contractor", label: "Contractor" },
  { value: "Homeowner", label: "Homeowner" },
];

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, options, error, register, ...rest }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log("Selected value:", event.target.value);
    };

    return (
      <div className={style.inputContainer}>
        <select
          {...rest}
          {...register}
          onChange={(event) => {
            handleChange(event); // Log the value
            rest.onChange?.(event); // Ensure the parent onChange handler is called, if provided
          }}
          className={style.inputField}
          // style={{
          //   color:
          //     rest.value === "Contractor" || rest.value === undefined
          //       ? "red"
          //       : "hsl(var(--primary))", //
          // }}
        >
          <option value="" disabled hidden>
            Position
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute top-[40%] right-[10px]">
          <SelectChevron />
        </div>

        <label className={style.label}>Position</label>
        {error && <p className={style.errorMessage}>{error}</p>}
      </div>
    );
  },
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
