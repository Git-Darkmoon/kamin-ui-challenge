import Image from "next/image"

export default function Logo({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      className={`flex items-center gap-1.5 px-0 md:px-6 py-5 border-b border-transparent text-slate-700 md:border-slate-200`}
    >
      <Image
        src="/logomark.svg"
        alt="Kamin Logo"
        width={32}
        height={32}
        className="size-6"
      />
      <span
        className={`text-3xl tracking-tight text-primary-900 font-family-abyssinica font-light ${className}`}
      >
        Kamin&nbsp;Studio
      </span>
    </div>
  )
}
