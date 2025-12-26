import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "../button"

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("applies variant styles correctly", () => {
    const { rerender } = render(
      <Button variant="outline">Outline Button</Button>
    )
    expect(screen.getByRole("button")).toHaveClass("border-slate-300")

    rerender(<Button variant="ghost">Ghost Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("hover:bg-slate-100")
  })

  it("applies size styles correctly", () => {
    const { rerender } = render(<Button size="sm">Small Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-8")

    rerender(<Button size="lg">Large Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-12")
  })

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
    expect(screen.getByRole("button")).toHaveClass(
      "disabled:pointer-events-none"
    )
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Button ref={ref}>Button with ref</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
