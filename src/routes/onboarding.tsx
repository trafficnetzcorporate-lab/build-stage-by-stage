import { createFileRoute, Outlet } from "@tanstack/react-router";

const NOINDEX_HEAD = {
  meta: [
    { name: "robots", content: "noindex, nofollow" },
    { title: "Onboarding · JMS Web Studio" },
    { name: "description", content: "Private onboarding workspace." },
  ],
};

export const Route = createFileRoute("/onboarding")({
  head: () => NOINDEX_HEAD,
  component: OnboardingLayout,
});

function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <Outlet />
    </div>
  );
}
