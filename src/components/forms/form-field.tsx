"use client";

import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select } from "../ui/select";

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: "text" | "textarea" | "select" | "password" | "email" | "number";
  children?: React.ReactElement | React.ReactElement[];
  [key: string]: any;
}

export function FormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  children,
  ...props
}: FormFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (type === "textarea") {
          return (
            <Textarea
              label={label}
              placeholder={placeholder}
              error={error?.message}
              {...field}
              {...props}
            />
          );
        }
        if (type === "select") {
          return (
            <Select
              label={label}
              placeholder={placeholder}
              error={error?.message}
              selectedKeys={field.value ? [field.value] : []}
              onChange={(e) => field.onChange(e.target.value)}
              {...props}
            >
              {children || []}
            </Select>
          );
        }
        return (
          <Input
            label={label}
            placeholder={placeholder}
            type={type}
            error={error?.message}
            {...field}
            {...props}
          />
        );
      }}
    />
  );
}
