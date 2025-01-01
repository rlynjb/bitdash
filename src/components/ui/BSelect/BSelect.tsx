"use client";

import React, { useState, useEffect } from "react";
import "./styles.css";

interface Props {
  label?: string;
  options?: any[];
  defaultValue?: any;
  onSelect?: any;
}

export const BSelect: React.FC<Props> = ({label = '', options = [], defaultValue, onSelect}) => {

  const handleChange = (value: any) => {
    onSelect(value);
  }

  return (
    <>
      <label>
        {label}
      </label>
      <select value={defaultValue} onChange={(e: any) => handleChange(e.target.value)}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default BSelect;