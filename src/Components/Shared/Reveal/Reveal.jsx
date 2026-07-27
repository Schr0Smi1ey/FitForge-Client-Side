import { FADE_UP, stagger } from "../../../motion";

/**
 * Scroll-reveal wrapper — the one place that knows *how* the app animates.
 *
 * Call sites say what they want ("reveal this, third in its group") rather than
 * which library and which magic numbers deliver it:
 *
 *   <Reveal index={i}>
 *     <TrainerCard … />
 *   </Reveal>
 *
 * Right now this emits AOS data attributes, because AOS is already initialised
 * and already styled. The point of the indirection is that swapping the body of
 * this component for framer-motion's `whileInView` is a one-file change instead
 * of a 33-file sweep — none of the call sites reference AOS at all.
 *
 * `as` keeps the wrapper from breaking layouts: inside a grid or flex row an
 * extra <div> becomes a track item and shifts everything, so those call sites
 * pass the element the parent expects, or render the child directly.
 */
const Reveal = ({
  children,
  animation = FADE_UP,
  index = 0,
  delay,
  as: Tag = "div",
  className = "",
  ...rest
}) => (
  <Tag
    data-aos={animation}
    data-aos-delay={delay ?? stagger(index)}
    className={className}
    {...rest}
  >
    {children}
  </Tag>
);

export default Reveal;
