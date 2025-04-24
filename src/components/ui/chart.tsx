
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChartContainerProps
  extends React.HTMLProps<HTMLDivElement> {
  config?: ChartConfig;
}

export function ChartContainer({
  children,
  config,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={cn("h-[350px] w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface ChartTooltipContentProps {
  name: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  formatter?: (value: number) => string;
}

export function ChartTooltipContent({
  name,
  value,
  suffix,
  prefix,
  formatter,
}: ChartTooltipContentProps) {
  const isNumber = typeof value === "number";
  const formattedValue = isNumber && formatter ? formatter(value) : value;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            Nome
          </span>
          <span className="font-bold">{name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            Valor
          </span>
          <span className="font-bold">
            {prefix}
            {formattedValue}
            {suffix}
          </span>
        </div>
      </div>
    </div>
  );
}
