// Central pricing settings — gold rate changes daily and GST is a
// store-wide setting, so these shouldn't live hardcoded inside each
// product's mock data. This mirrors the same USE_MOCK pattern as
// your other services (products, banners, collections).

const USE_MOCK = true;

const mockPricingSettings = {
  goldRatePerGram: 6850, // admin updates this daily to match live market rate
  silverRatePerGram: 90,
  gstPercent: 3,
};

export async function getPricingSettings() {
  if (USE_MOCK) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockPricingSettings), 300)
    );
  }
  const res = await fetch("/api/pricing-settings");
  if (!res.ok) throw new Error("Failed to fetch pricing settings");
  return res.json();
}