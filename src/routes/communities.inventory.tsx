import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { InventoryGrid } from "@/components/inventory/InventoryGrid";

export const Route = createFileRoute("/communities/inventory")({
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
  return (
    <Section tone="cream" size="sm" className="pt-24 md:pt-28">
      <Container>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Inventory</Eyebrow>
            <h1 className="text-display-3 mt-2 text-navy">
              Every active Adams Home in Nancy's territory
            </h1>
          </div>
          <p className="text-sm text-muted-foreground md:max-w-xs md:text-right">
            Sorted by price · Filter by city · Updated every 4 hours
          </p>
        </div>

        <div className="mt-6">
          <InventoryGrid />
        </div>
      </Container>
    </Section>
  );
}
