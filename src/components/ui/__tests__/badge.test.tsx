import { render, screen } from "@testing-library/react"
import { Badge } from "../badge"

describe("Badge", () => {
  it("renders badge with text", () => {
    render(<Badge>Status</Badge>)
    expect(screen.getByText("Status")).toBeInTheDocument()
  })

  it("applies variant styles correctly", () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>)
    expect(screen.getByText("Success")).toHaveClass("bg-green-100")

    rerender(<Badge variant="warning">Warning</Badge>)
    expect(screen.getByText("Warning")).toHaveClass("bg-orange-100")

    rerender(<Badge variant="error">Error</Badge>)
    expect(screen.getByText("Error")).toHaveClass("bg-red-100")

    rerender(<Badge variant="default">Default</Badge>)
    expect(screen.getByText("Default")).toHaveClass("bg-slate-100")
  })

  it("applies custom className", () => {
    render(<Badge className="custom-class">Badge</Badge>)
    expect(screen.getByText("Badge")).toHaveClass("custom-class")
  })

  it("renders as div element", () => {
    render(<Badge>Default Badge</Badge>)
    expect(screen.getByText("Default Badge").tagName).toBe("DIV")
  })
})
