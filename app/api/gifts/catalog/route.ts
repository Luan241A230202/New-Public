/**
 * GET /api/gifts/catalog
 * Get the catalog of available virtual gifts
 */
export async function GET() {
  const giftCatalog = [
    { id: "rose", name: "Rose", price: 10, icon: "🌹", tier: "bronze", animation: "bounce" },
    { id: "star", name: "Star", price: 15, icon: "⭐", tier: "bronze", animation: "twinkle" },
    { id: "balloon", name: "Balloon", price: 12, icon: "🎈", tier: "bronze", animation: "float" },
    { id: "heart", name: "Heart", price: 20, icon: "❤️", tier: "silver", animation: "pulse" },
    { id: "gift", name: "Gift Box", price: 25, icon: "🎁", tier: "silver", animation: "shake" },
    { id: "rocket", name: "Rocket", price: 30, icon: "🚀", tier: "silver", animation: "fly" },
    { id: "cake", name: "Cake", price: 35, icon: "🎂", tier: "gold", animation: "bounce" },
    { id: "fire", name: "Fire", price: 40, icon: "🔥", tier: "gold", animation: "flicker" },
    { id: "confetti", name: "Confetti", price: 45, icon: "🎉", tier: "gold", animation: "explode" },
    { id: "trophy", name: "Trophy", price: 50, icon: "🏆", tier: "gold", animation: "shine" },
    { id: "crown", name: "Crown", price: 100, icon: "👑", tier: "platinum", animation: "glow" },
    { id: "diamond", name: "Diamond", price: 200, icon: "💎", tier: "diamond", animation: "sparkle" },
  ];

  return Response.json({
    gifts: giftCatalog,
    total: giftCatalog.length,
    tiers: {
      bronze: giftCatalog.filter((g) => g.tier === "bronze").length,
      silver: giftCatalog.filter((g) => g.tier === "silver").length,
      gold: giftCatalog.filter((g) => g.tier === "gold").length,
      platinum: giftCatalog.filter((g) => g.tier === "platinum").length,
      diamond: giftCatalog.filter((g) => g.tier === "diamond").length,
    },
  });
}
