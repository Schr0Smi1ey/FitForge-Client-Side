import { GridLoader } from "react-spinners";
import { BRAND } from "../../../theme";

/**
 * The app's single loading indicator.
 *
 * The same spinner block was copy-pasted into 24 files, each repeating the brand
 * hex, which is both a maintenance problem and an accessibility one: a spinning
 * graphic with no accessible name tells a screen reader nothing.
 *
 * role="status" makes assistive tech announce the change without stealing focus,
 * and the visually-hidden text gives it something to announce.
 */
const Loader = ({ size = 40, fullScreen = true, label = "Loading" }) => (
  <div
    role="status"
    aria-live="polite"
    className={`flex items-center justify-center ${fullScreen ? "min-h-screen" : "py-10"}`}
  >
    <GridLoader color={BRAND.primary} size={size} aria-hidden="true" />
    <span className="sr-only">{label}</span>
  </div>
);

export default Loader;
