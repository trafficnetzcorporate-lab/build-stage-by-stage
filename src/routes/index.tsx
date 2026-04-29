import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
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
          "Bring your buyer. Keep your full commission. Nancy Clarke is the #1 sales associate for Adams Homes in St. Lucie County — partnering with realtors whose buyers want a brand-new Adams Home.",
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
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
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
