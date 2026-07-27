import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Reveal from "./Reveal";
import { STAGGER } from "../../../motion";

describe("Reveal", () => {
  it("renders its children", () => {
    const { getByText } = render(<Reveal>content</Reveal>);
    expect(getByText("content")).toBeInTheDocument();
  });

  it("defaults to the shared fade-up animation", () => {
    const { container } = render(<Reveal>x</Reveal>);
    expect(container.firstChild.getAttribute("data-aos")).toBe("fade-up");
  });

  // The delay comes from the item's position, not a number typed at the call
  // site. That is the whole point: 21 hand-picked delay values are what this
  // replaced.
  it("derives its delay from the item's index", () => {
    const { container } = render(<Reveal index={1}>x</Reveal>);
    expect(container.firstChild.getAttribute("data-aos-delay")).toBe(
      String(STAGGER[1])
    );
  });

  it("clamps long lists to the last step", () => {
    const { container } = render(<Reveal index={50}>x</Reveal>);
    expect(container.firstChild.getAttribute("data-aos-delay")).toBe(
      String(STAGGER[STAGGER.length - 1])
    );
  });

  // An escape hatch that still goes through one component, so the places that
  // genuinely need a different beat stay greppable.
  it("allows an explicit delay to win over the index", () => {
    const { container } = render(
      <Reveal index={2} delay={0}>
        x
      </Reveal>
    );
    expect(container.firstChild.getAttribute("data-aos-delay")).toBe("0");
  });

  // Inside a grid or flex row an extra <div> becomes a track item and shifts
  // the layout, so call sites must be able to pick the element.
  it("can render as a different element", () => {
    const { container } = render(<Reveal as="li">x</Reveal>);
    expect(container.firstChild.tagName).toBe("LI");
  });
});
