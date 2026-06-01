import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { InventoryGrid } from "@/components/inventory/InventoryGrid";
import type { CityFilter } from "@/integrations/adams-homes/types";

const searchSchema = z.object({
  city: fallback(z.string(), "all").default("all"),
  demand: fallback(z.boolean(), false).default(false),
});


export const Route = createFileRoute("/communities_/inventory")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Available Adams Homes Inventory — St. Lucie County" },
      {
        name: "description",
        content:
          "Browse every active Adams Homes listing in Port St. Lucie, Fort Pierce, and Okeechobee County. Filter by city, sorted by price.",
      },
    ],
  }),
  component: InventoryPage,
});

function InventoryPage() {
  const { city, demand } = Route.useSearch();
  return (
    <Section tone="cream" size="sm" className="pt-24 md:pt-28">
      <Container>
        <InventoryGrid initialFilter={city as CityFilter} initialDemand={demand} />
      </Container>
    </Section>
  );
}
