"use client";

import { ICON_NAMES, SiteIcon } from "@/lib/icons";
import { inputCls } from "./ui";

/** Drop-down of the available icons with a live preview. */
export default function IconSelect({
  value,
  onChange,
  name,
}: {
  value: string;
  onChange: (v: string) => void;
  name?: string;
}) {
  return (
    <span className="flex items-center gap-3">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-silver bg-white text-steel">
        <SiteIcon name={value} size={26} />
      </span>
      <select name={name} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        {ICON_NAMES.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </span>
  );
}
