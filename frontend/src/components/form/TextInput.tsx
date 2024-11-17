import React, { forwardRef } from "react";
import { TextInputProps } from "../../lib/formTypes";

import style from "./ContactForm.module.scss";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, placeholder, error, value, onChange, register, ...rest }, ref) => (
    <div className={style.inputContainer}>
      <input
        placeholder={placeholder}
        {...register}
        {...rest}
        value={value}
        onChange={onChange}
        className={style.inputField}
      />
      <label className={style.label}>{label}</label>
      {error && <p className={style.errorMessage}>{error}</p>}
    </div>
  ),
);

export default TextInput;
