// ReactJS
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// Pages
import LoginPage from "@pages/[locale]/login/page";

describe("Login Page", () => {
    it("renders a heading", () => {
        render(<LoginPage />);
 
        const heading = screen.getByRole("heading", { level: 1 });
 
        expect(heading).toBeInTheDocument();
    });
});