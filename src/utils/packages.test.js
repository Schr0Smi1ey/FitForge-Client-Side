import { describe, it, expect } from "vitest";
import { PACKAGE_PRICES, PACKAGES } from "./packages";

describe("package display prices", () => {
  it("exposes exactly the three packages the server prices", () => {
    expect(Object.keys(PACKAGE_PRICES).sort()).toEqual([
      "Basic",
      "Premium",
      "Standard",
    ]);
  });

  // These must agree with FitForge-Server-Side/config/pricing.js (cents/100).
  // A mismatch would quote one price and charge another.
  it("matches the server's canonical prices", () => {
    expect(PACKAGE_PRICES.Basic).toBe(1000 / 100);
    expect(PACKAGE_PRICES.Standard).toBe(5000 / 100);
    expect(PACKAGE_PRICES.Premium).toBe(10000 / 100);
  });

  it("keeps the picker list and the price map in agreement", () => {
    for (const pkg of PACKAGES) {
      expect(pkg.price).toBe(PACKAGE_PRICES[pkg.name]);
    }
  });

  it("gives every package a name, price and features", () => {
    expect(PACKAGES).toHaveLength(3);
    for (const pkg of PACKAGES) {
      expect(typeof pkg.name).toBe("string");
      expect(typeof pkg.price).toBe("number");
      expect(pkg.features.length).toBeGreaterThan(0);
    }
  });

  it("cannot be mutated at runtime", () => {
    expect(() => {
      PACKAGE_PRICES.Premium = 1;
    }).toThrow();
  });
});
