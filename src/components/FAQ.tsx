"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { NavArrowDown } from "iconoir-react";

export interface FaqItem {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <Accordion.Item value={`item-${i}`} key={i} className="">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left font-display font-semibold text-ink">
              <span>{item.q}</span>
              <NavArrowDown
                className="h-5 w-5 text-muted transition-transform group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-muted data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="pb-5 pr-8">{item.a}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
