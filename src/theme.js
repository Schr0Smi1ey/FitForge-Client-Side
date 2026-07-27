/**
 * Brand colours as JavaScript values.
 *
 * Tailwind classes cover markup, but several libraries here (MUI charts,
 * SweetAlert) take a colour as a prop or config value where a class name is
 * useless. Those call sites used to hardcode the hex, which is how a second,
 * slightly different green (#3D8D7A) ended up competing with the brand primary.
 * Import from here instead.
 *
 * Keep in sync with the `colors` block in tailwind.config.js — same values,
 * two consumers.
 */
export const BRAND = {
  primary: "#198068",
  // Used for hover accents in the dashboard and navbar.
  accent: "#802819",
  success: "#32CD32",
  danger: "#FF4500",
  surface: "#f5f5f5",
};

export default BRAND;
