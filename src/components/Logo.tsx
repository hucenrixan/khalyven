import Image from "next/image";

export function LogoMark({
  className = "h-10 w-10",
  dark = false,
}: {
  className?: string;
  /** Use the black mark (for light backgrounds). Default is white for navy areas. */
  dark?: boolean;
}) {
  return (
    <Image
      src={dark ? "/brand/mark-black.png" : "/brand/mark-white.png"}
      alt=""
      width={956}
      height={942}
      className={`object-contain ${className}`}
      priority
    />
  );
}

export default function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark dark={!light} />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[15px] font-normal tracking-[0.42em] ${
            light ? "text-white" : "text-charcoal"
          }`}
        >
          KHALYVEN
        </span>
        <span
          className={`mt-1.5 text-[8px] font-light tracking-[0.5em] ${
            light ? "text-silver" : "text-muted"
          }`}
        >
          INTERNATIONAL
        </span>
      </span>
    </span>
  );
}
