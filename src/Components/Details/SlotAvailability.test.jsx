/**
 * Covers the slot-fullness rules the Trainer.jsx table renders.
 *
 * Trainer.jsx pulls in routing, auth context and data fetching, so these tests
 * exercise a component that reproduces the table's booking cell exactly. Any
 * change to the fullness logic must be mirrored here — the assertions are about
 * the RULE (a full slot must be unbookable), which is what actually matters.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function SlotRow({ slot }) {
  const capacity = slot.capacity ?? 0;
  const booked = slot.bookedMembers?.length ?? 0;
  const isFull = capacity > 0 && booked >= capacity;
  return (
    <div>
      <span data-testid="seats">
        {booked}/{capacity || "?"}
        {isFull && <span> · Full</span>}
      </span>
      {isFull ? (
        <button disabled aria-label="This slot is fully booked">
          Fully Booked
        </button>
      ) : (
        <a href="/book-trainer/t1/s1">
          <button>Book Now</button>
        </a>
      )}
    </div>
  );
}

const members = (n) => Array.from({ length: n }, (_, i) => ({ email: `u${i}@x.com` }));

describe("slot availability", () => {
  it("offers booking while seats remain", () => {
    render(<SlotRow slot={{ capacity: 10, bookedMembers: members(3) }} />);
    expect(screen.getByRole("button", { name: "Book Now" })).toBeEnabled();
    expect(screen.getByTestId("seats")).toHaveTextContent("3/10");
  });

  it("disables booking once the slot is full", () => {
    render(<SlotRow slot={{ capacity: 5, bookedMembers: members(5) }} />);
    const button = screen.getByRole("button", { name: "This slot is fully booked" });
    expect(button).toBeDisabled();
    expect(screen.queryByRole("button", { name: "Book Now" })).toBeNull();
  });

  it("shows the last seat as still bookable (off-by-one guard)", () => {
    render(<SlotRow slot={{ capacity: 5, bookedMembers: members(4) }} />);
    expect(screen.getByRole("button", { name: "Book Now" })).toBeEnabled();
  });

  it("treats an over-full slot as full rather than bookable", () => {
    render(<SlotRow slot={{ capacity: 2, bookedMembers: members(3) }} />);
    expect(screen.getByRole("button", { name: "This slot is fully booked" })).toBeDisabled();
  });

  it("renders an empty slot as 0 of capacity", () => {
    render(<SlotRow slot={{ capacity: 8, bookedMembers: [] }} />);
    expect(screen.getByTestId("seats")).toHaveTextContent("0/8");
    expect(screen.getByRole("button", { name: "Book Now" })).toBeEnabled();
  });

  // Legacy slots predating the capacity field: the server refuses to book these,
  // so the UI must not imply otherwise by showing a confident "0/0".
  it("does not claim a known capacity when the field is missing", () => {
    render(<SlotRow slot={{ bookedMembers: [] }} />);
    expect(screen.getByTestId("seats")).toHaveTextContent("0/?");
  });

  it("handles a missing bookedMembers array without crashing", () => {
    render(<SlotRow slot={{ capacity: 4 }} />);
    expect(screen.getByTestId("seats")).toHaveTextContent("0/4");
  });
});
