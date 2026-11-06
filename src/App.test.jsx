import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("Campus Store - Context & UI Integration Tests", () => {
  // TEST 1: Component Rendering
  it("renders the English store heading by default", () => {
    // 1. Arrange
    render(<App />);

    // 2. Assert
    const heading = screen.getByText("Academic Courses & Study Materials");
    expect(heading).toBeInTheDocument();
  });

  // TEST 2: LanguageContext Switching (EN -> KH)
  it("translates the UI to Khmer when the language button is clicked", () => {
    // 1. Arrange
    render(<App />);

    // 2. Act: Find and click the Khmer language toggle button
    const langBtn = screen.getByText("ភាសាខ្មែរ");
    fireEvent.click(langBtn);

    // 3. Assert: Verify the hero heading is now in Khmer
    const khmerHeading = screen.getByText("វគ្គសិក្សា និងឯកសារសិក្សា");
    expect(khmerHeading).toBeInTheDocument();
  });

  // TEST 3: CartContext Intergration (ProductCard -> Navbar Badge)
  it("increments the Navbar cart counter when '+ Add to Cart' is clicked", () => {
    // 1. Arrange
    render(<App />);

    // 2. Act: Click the first "+ Add to Cart" button on the page
    const addButtons = screen.getAllByText("+ Add to Cart");
    fireEvent.click(addButtons[0]);

    // 3. Assert: Button text changes to "+ Add More (1)"
    expect(screen.getByText("+ Add More (1)")).toBeInTheDocument();
  });
});
