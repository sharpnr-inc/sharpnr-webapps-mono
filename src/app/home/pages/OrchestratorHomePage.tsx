import { HomeHeader } from "../components/HomeHeader";
import { AnnouncementsCarousel } from "../components/AnnouncementsCarousel";
import { QuickActions } from "../components/QuickActions";
import { IndustryNewsFeed } from "../components/IndustryNewsFeed";
import { InventoryOverview } from "../components/InventoryOverview";
import { OffersPanel } from "../components/OffersPanel";
import { ActivityFeed } from "../components/ActivityFeed";
import { UpcomingEvents } from "../components/UpcomingEvents";

export function OrchestratorHomepage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      <HomeHeader />

      <QuickActions />

      <AnnouncementsCarousel />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main feed */}
        <div className="space-y-6 lg:col-span-2">
          <IndustryNewsFeed />
        </div>

        {/* Side rail */}
        <aside className="space-y-6">
          <InventoryOverview />
          <UpcomingEvents />
          <OffersPanel />
          <ActivityFeed />
        </aside>
      </div>
    </div>
  );
}
