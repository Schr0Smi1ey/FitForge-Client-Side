import { describe, it, expect } from "vitest";
import { AOS_CONFIG, STAGGER, stagger, FADE_UP, FADE_IN } from "./motion";

describe("stagger", () => {
  it("returns the scale steps in order", () => {
    expect([stagger(0), stagger(1), stagger(2)]).toEqual(STAGGER);
  });

  // The point of the clamp: a 12-item list previously accumulated delay per
  // item, so the last card appeared long after the first. Saturating at the
  // final step keeps a long list feeling immediate.
  it("clamps past the end of the scale instead of growing", () => {
    expect(stagger(11)).toBe(STAGGER[STAGGER.length - 1]);
    expect(stagger(99)).toBe(STAGGER[STAGGER.length - 1]);
  });

  it("defaults to no delay", () => {
    expect(stagger()).toBe(0);
  });
});

describe("AOS_CONFIG", () => {
  // `once` is what stops long pages re-animating every time you scroll past a
  // section, which is the single biggest contributor to a page feeling busy.
  it("animates each element only once", () => {
    expect(AOS_CONFIG.once).toBe(true);
  });
});

describe("animation names", () => {
  // AOS has no "fade-in". An unrecognised name still fades, because AOS matches
  // [data-aos^="fade"] for the opacity transition, so a typo here would look
  // fine and quietly stop working if that stylesheet ever changed.
  it("uses names AOS actually defines", () => {
    expect(FADE_UP).toBe("fade-up");
    expect(FADE_IN).toBe("fade");
  });
});
