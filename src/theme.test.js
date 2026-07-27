import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { BRAND } from "./theme";

const tailwindConfig = readFileSync("tailwind.config.js", "utf8");

describe("design tokens", () => {
  it("defines every brand colour as a valid hex value", () => {
    for (const [name, value] of Object.entries(BRAND)) {
      expect(value, name).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  // The palette is consumed twice: as Tailwind classes in markup, and as JS
  // values by libraries that take a colour prop. If the two copies drift, the
  // chart and the buttons beside it stop matching.
  it("keeps src/theme.js and tailwind.config.js in agreement", () => {
    for (const [name, value] of Object.entries(BRAND)) {
      expect(tailwindConfig, `${name} missing or different in tailwind.config.js`)
        .toContain(`${name}: "${value}"`);
    }
  });

  it("uses one green, so no second brand colour can creep back in", () => {
    // #3D8D7A previously sat alongside #198068 as a competing green.
    expect(BRAND.primary).toBe("#198068");
    expect(Object.values(BRAND)).not.toContain("#3D8D7A");
  });
});
