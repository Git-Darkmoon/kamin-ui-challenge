import { cn } from "../cn"

describe("cn (className utility)", () => {
  it("should combine class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2")
  })

  it("should handle conditional classes", () => {
    const condition = true
    const hidden = false
    expect(cn("base", condition && "conditional", hidden && "hidden")).toBe(
      "base conditional"
    )
  })

  it("should handle undefined and null values", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end")
  })

  it("should merge Tailwind classes correctly", () => {
    // The cn function uses tailwind-merge to intelligently merge Tailwind classes
    expect(cn("px-2 py-1", "px-3")).toBe("py-1 px-3")
  })

  it("should handle empty input", () => {
    expect(cn()).toBe("")
  })

  it("should handle array inputs", () => {
    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3")
  })
})
