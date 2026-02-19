/**
 * Luxury API Platform - Homepage
 * Showcase enterprise API platform with purple-black luxury theme
 */

import LuxuryAPILanding from "./api-landing";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="luxury-container mx-auto max-w-7xl py-8">
      <LuxuryAPILanding />
    </main>
  );
}
