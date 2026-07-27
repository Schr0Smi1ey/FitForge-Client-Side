// Package prices for DISPLAY ONLY.
//
// The server holds the canonical prices (FitForge-Server-Side/config/pricing.js) and
// computes every Stripe charge from the package NAME, so nothing here can affect what
// a user is actually charged — tampering with these values only changes what the page
// shows. If you change a price, change it on the server too; that copy is the real one.
//
// Kept in one place so BookTrainer (the picker) and PaymentForm (the summary) can never
// drift apart and quote two different prices for the same package.
export const PACKAGE_PRICES = Object.freeze({
  Basic: 10,
  Standard: 50,
  Premium: 100,
});

export const PACKAGES = [
  {
    name: "Basic",
    price: PACKAGE_PRICES.Basic,
    features: [
      "Access for 1 Month",
      "Gym access during regular hours",
      "Cardio & strength equipment",
      "Locker rooms & showers",
      "Water refill station access",
      "Basic fitness assessment",
    ],
  },
  {
    name: "Premium",
    price: PACKAGE_PRICES.Premium,
    features: [
      "Access for 6 Months",
      "All Standard benefits",
      "Personal training sessions (4 per month)",
      "Advanced body composition analysis",
      "Exclusive access to premium equipment",
      "Discounts on massage & nutrition counseling",
    ],
  },
  {
    name: "Standard",
    price: PACKAGE_PRICES.Standard,
    features: [
      "Access for 3 Months",
      "All Basic benefits",
      "Group fitness classes (Yoga, Zumba, Spinning)",
      "Sauna & steam room access",
      "Extended gym hours",
      "Nutrition consultation (1 session)",
    ],
  },
];
