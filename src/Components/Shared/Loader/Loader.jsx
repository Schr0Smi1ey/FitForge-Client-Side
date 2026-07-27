/**
 * The app's single loading indicator.
 *
 * The same spinner block was copy-pasted into 24 files, each repeating the brand
 * hex, which is both a maintenance problem and an accessibility one: a spinning
 * graphic with no accessible name tells a screen reader nothing.
 *
 * role="status" makes assistive tech announce the change without stealing focus,
 * and the visually-hidden text gives it something to announce.
 *
 * This is a plain CSS ring rather than a JS spinner library. The previous
 * GridLoader pulled in a whole spinner package to animate nine dots, which is a
 * lot of machinery — and a lot of visual noise — for "something is happening".
 * The ring is one element and one keyframe, so it also keeps spinning while the
 * main thread is busy, which is exactly when a loader is on screen.
 *
 * Sizes are a fixed scale, not free numbers. Call sites used to pass 30/40/50
 * interchangeably and the loader was a slightly different size on every route.
 */
const SIZES = {
  sm: "h-4 w-4 border-2", // inline: inside buttons and table cells
  md: "h-8 w-8 border-2", // section-level: a card or panel is loading
  lg: "h-12 w-12 border-[3px]", // page-level: the whole route is loading
};

const Loader = ({ size = "lg", fullScreen = true, label = "Loading" }) => (
  <div
    role="status"
    aria-live="polite"
    className={`flex items-center justify-center ${
      fullScreen ? "min-h-screen" : "py-10"
    }`}
  >
    <span
      aria-hidden="true"
      data-loader-ring=""
      className={`${
        SIZES[size] ?? SIZES.lg
      } inline-block animate-spin rounded-full border-solid border-primary/20 border-t-primary`}
    />
    <span className="sr-only">{label}</span>
  </div>
);

export default Loader;
