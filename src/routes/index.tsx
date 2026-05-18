import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { NamePlate } from "@/components/home/NamePlate";
import { PartnershipMath } from "@/components/home/PartnershipMath";
import { FeaturedCommunities } from "@/components/home/FeaturedCommunities";
import { LiveInventory } from "@/components/home/LiveInventory";
import { MeetNancy } from "@/components/home/MeetNancy";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import { DualPathCta } from "@/components/home/DualPathCta";
import { CommunitiesGallery } from "@/components/home/CommunitiesGallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nancy Clarke — #1 Adams Homes Realtor, St. Lucie County FL" },
      {
        name: "description",
        content:
          "Bring your buyer. Keep your full commission. Nancy Clarke is the #1 Adams Homes Sales Associate in St. Lucie County, Florida.",
      },
      {
        property: "og:title",
        content: "Nancy Clarke — #1 Adams Homes Realtor, St. Lucie County FL",
      },
      {
        property: "og:description",
        content:
          "Realtors keep 100% of their buyer-side commission. Nancy handles the build, the financing, and the close.",
      },
      { property: "og:url", content: "https://nancyclarkerealtor.com/" },
    ],
    links: [{ rel: "canonical", href: "https://nancyclarkerealtor.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "Nancy Clarke",
          jobTitle: "Sales Associate, Adams Homes of Northwest Florida",
          telephone: "+1-772-899-7333",
          email: "nancy.clarke@adamshomes.com",
          url: "https://nancyclarkerealtor.com/",
          areaServed: [
            { "@type": "City", name: "Port St. Lucie" },
            { "@type": "City", name: "Fort Pierce" },
            { "@type": "AdministrativeArea", name: "Okeechobee County" },
          ],
          address: {
            "@type": "PostalAddress",
            addressRegion: "FL",
            addressCountry: "US",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <NamePlate />
      <PartnershipMath />
      <FeaturedCommunities />
      <LiveInventory />
      <MeetNancy />
      <CommunitiesGallery />
      <VideoShowcase />
      <Testimonials />
      <DualPathCta />
    </>
  );
}
