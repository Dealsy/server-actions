"use client";

import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Option = string;

export function StatusSelectField({
  name,
  defaultValue = "",
  options = ["active", "paused", "archived"],
  disabled = false,
}: {
  name: string;
  defaultValue?: Option;
  options?: readonly Option[];
  disabled?: boolean;
}) {
  const initial = (defaultValue || (options[0] ?? "")) as string;
  const [value, setValue] = useState<string>(initial);

  return (
    <div className="flex items-center gap-2">
      <input type="hidden" name={name} value={value} />
      <Select value={value} onValueChange={setValue} disabled={disabled}>
        <SelectTrigger className="min-w-[8rem]" aria-disabled={disabled}>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
