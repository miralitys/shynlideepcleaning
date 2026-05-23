import * as React from "react"

import { cn } from "@/lib/utils"

type AccordionContextValue = {
  openValue?: string
  collapsible?: boolean
  setOpenValue: (value?: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)
const AccordionItemContext = React.createContext<string | null>(null)

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single"
  collapsible?: boolean
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

function Accordion({
  className,
  collapsible,
  defaultValue,
  value,
  onValueChange,
  ...props
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const openValue = value ?? uncontrolledValue

  const contextValue = React.useMemo<AccordionContextValue>(
    () => ({
      openValue,
      collapsible,
      setOpenValue(nextValue) {
        setUncontrolledValue(nextValue)
        onValueChange?.(nextValue ?? "")
      },
    }),
    [collapsible, onValueChange, openValue],
  )

  return (
    <AccordionContext.Provider value={contextValue}>
      <div data-slot="accordion" className={className} {...props} />
    </AccordionContext.Provider>
  )
}

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string
}

function AccordionItem({ className, value, ...props }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div
        data-slot="accordion-item"
        data-value={value}
        className={cn("border-b last:border-b-0", className)}
        {...props}
      />
    </AccordionItemContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(AccordionContext)
  const itemValue = React.useContext(AccordionItemContext)
  const isOpen = Boolean(itemValue && context?.openValue === itemValue)

  return (
    <h3 className="flex">
      <button
        type="button"
        data-slot="accordion-trigger"
        data-state={isOpen ? "open" : "closed"}
        aria-expanded={isOpen}
        className={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented || !context || !itemValue) return
          const nextValue = isOpen && context.collapsible ? undefined : itemValue
          context.setOpenValue(nextValue)
        }}
        {...props}
      >
        {children}
        <span aria-hidden="true" className="pointer-events-none grid size-4 shrink-0 translate-y-0.5 place-items-center text-muted-foreground transition-transform duration-200">
          v
        </span>
      </button>
    </h3>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(AccordionContext)
  const itemValue = React.useContext(AccordionItemContext)
  const isOpen = Boolean(itemValue && context?.openValue === itemValue)

  return (
    <div
      data-slot="accordion-content"
      data-state={isOpen ? "open" : "closed"}
      hidden={!isOpen}
      className="overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
