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
    <Section tone="cream" size="lg" className="pt-32 md:pt-40">
      <Container>
        <Eyebrow>Inventory</Eyebrow>
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Every active Adams Home in Nancy's territory.
        </h1>
        <p className="mt-6 max-w-[640px] text-[17px] leading-relaxed text-muted-foreground">
          Sorted by price. Filter by city. Updated from the live Adams Homes feed
          every four hours.
        </p>

        <div className="mt-14">
          <InventoryGrid />
        </div>
      </Container>
    </Section>
  );
}
