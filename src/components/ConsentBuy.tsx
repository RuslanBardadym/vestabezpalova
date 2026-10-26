import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function ConsentCheckbox({ checked, onChange, className = "" }: { checked: boolean; onChange: (v: boolean) => void; className?: string }) {
  return (
    <label className={"flex cursor-pointer items-start gap-3 text-left text-xs font-light leading-5 text-muted-foreground " + className}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-lipstick,#cc0000)]" />
      <span>
        Оплачуючи замовлення, я приймаю умови{" "}
        <Link to="/oferta" target="_blank" className="text-ink underline hover:text-lipstick">договору (оферти) про надання послуг</Link>
      </span>
    </label>
  );
}

export function BuyLink({ href, label, className, disabled }: { href: string; label: string; className: string; disabled: boolean }) {
  return (
    <a
      href={disabled ? undefined : href}
      target="_blank"
      rel="noreferrer"
      aria-disabled={disabled}
      onClick={(e) => disabled && e.preventDefault()}
      className={className + (disabled ? " pointer-events-none opacity-40" : "")}
    >
      {label} <ArrowRight size={15} />
    </a>
  );
}
