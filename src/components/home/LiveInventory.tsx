import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { InventoryCarousel } from "@/components/inventory/InventoryCarousel";
import { HOMEPAGE } from "@/content/site";

export function LiveInventory() {
  const { eyebrow, headline, subhead } = HOMEPAGE.inventory;

  return (
    <Section tone="cream" size="lg">
      <Container>
        <FadeInOnScroll>
          <div className="text-center">
            <div className="flex justify-center">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h2 className="text-display-2 mt-6 text-navy">{headline}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {subhead}
            </p>
          </div>
        </FadeInOnScroll>

        <div className="mt-14">
          <InventoryCarousel />
        </div>
      </Container>
    </Section>
  );
}
