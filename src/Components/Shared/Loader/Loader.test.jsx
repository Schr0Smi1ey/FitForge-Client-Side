import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";
import TableSkeleton from "./TableSkeleton";

describe("Loader", () => {
  // A spinning graphic with no accessible name tells a screen reader nothing,
  // which was the state of all 24 copies this component replaced.
  it("announces itself as a status region", () => {
    render(<Loader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("exposes a text label to assistive technology", () => {
    render(<Loader />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("accepts a specific label so nested loaders are distinguishable", () => {
    render(<Loader label="Loading trainers" />);
    expect(screen.getByText("Loading trainers")).toBeInTheDocument();
  });

  it("can render inline rather than filling the viewport", () => {
    const { container } = render(<Loader fullScreen={false} />);
    expect(container.firstChild.className).not.toContain("min-h-screen");
  });

  // Call sites used to pass raw pixel numbers (30, 40 and 50 were all in use),
  // so the loader was a different size on almost every route. Sizes are now a
  // closed set and anything outside it falls back rather than rendering a
  // ring with no dimensions at all.
  it("renders the requested size from the scale", () => {
    const { container } = render(<Loader size="sm" />);
    expect(container.querySelector("[data-loader-ring]").className).toContain(
      "h-4 w-4"
    );
  });

  it("falls back to the page-level size when given an unknown one", () => {
    const { container } = render(<Loader size="enormous" />);
    expect(container.querySelector("[data-loader-ring]").className).toContain(
      "h-12 w-12"
    );
  });

  // The ring is the only decorative part; the status role and label carry the
  // meaning, so the ring itself must stay out of the accessibility tree.
  it("hides the ring from assistive technology", () => {
    const { container } = render(<Loader />);
    expect(
      container.querySelector("[data-loader-ring]").getAttribute("aria-hidden")
    ).toBe("true");
  });
});

describe("TableSkeleton", () => {
  it("announces loading once, not once per placeholder cell", () => {
    render(<TableSkeleton rows={4} columns={3} />);
    expect(screen.getAllByRole("status")).toHaveLength(1);
    expect(screen.getByText("Loading table data")).toBeInTheDocument();
  });

  it("renders the requested number of placeholder rows", () => {
    const { container } = render(<TableSkeleton rows={6} columns={3} title={false} />);
    // 6 body rows, each a flex row of placeholder cells, plus the header row.
    const rows = container.querySelectorAll(".border-b");
    expect(rows).toHaveLength(6);
  });

  it("hides the decorative shapes from assistive technology", () => {
    const { container } = render(<TableSkeleton />);
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });
});
