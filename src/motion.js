/**
 * Motion tokens — the single source of truth for scroll-reveal timing.
 *
 * The app previously carried 21 distinct `data-aos-delay` values (100, 150, 160,
 * 170, 180, 190, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 400,
 * 500, 600). Nothing chose between them; they were typed per call site, so two
 * cards sitting next to each other could animate 20ms apart for no reason. A
 * fixed scale means a stagger is picked by *position in a group*, not by taste.
 *
 * Keep this small on purpose. If a fourth step is ever genuinely needed, the
 * honest fix is usually fewer animated elements rather than more delay values.
 */

/** Base config passed to AOS.init(). Exported so tests can assert on it. */
export const AOS_CONFIG = {
  duration: 500,
  easing: "ease-out-cubic",
  // Animate once. Re-animating on every scroll-past is what made long pages feel
  // busy, and it fights the browser on back-navigation.
  once: true,
  offset: 40,
};

/**
 * Stagger steps, in milliseconds.
 *
 * Index into this by an item's position in its group and let it saturate at the
 * end, so a 3-card row staggers but a 12-post list does not take 2s to appear:
 *
 *   <div data-aos="fade-up" data-aos-delay={stagger(i)}>
 */
export const STAGGER = [0, 100, 200];

/** Clamps to the last step so long lists never accumulate a visible lag. */
export const stagger = (index = 0) =>
  STAGGER[Math.min(index, STAGGER.length - 1)];

/**
 * The two reveal directions the app uses.
 *
 * It previously used five (fade-up, fade-down, fade-right, fade-left, zoom-in)
 * plus one typo'd `"fade-down "` with a trailing space, which AOS silently
 * ignored — that element simply never animated and nobody noticed, which is the
 * best argument available for keeping this list short.
 *
 * FADE_UP is the default for content entering as you scroll down the page.
 * FADE_IN is for things that should not move, like a full-bleed hero image where
 * a translate would show a gap at the edge.
 *
 * Note FADE_IN is plain `"fade"`, not `"fade-in"` — AOS has no `fade-in`. It
 * would still have appeared to work, because AOS's `[data-aos^="fade"]` prefix
 * rule sets opacity on anything starting with "fade", so an unrecognised name
 * fades without a transform by coincidence. Relying on that is one refactor of
 * AOS's stylesheet away from silently doing nothing.
 */
export const FADE_UP = "fade-up";
export const FADE_IN = "fade";
